from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status, views
from rest_framework.response import Response

from apps.accounts.models import Lender
from apps.accounts.serializers import LoginSerializer, UserSerializer
from apps.accounts.views import account_activation_token
from apps.lib.utils import get_token_for_user, send_mail_async

from .permissions import isLenderAdminUser, isLenderUser
from .serializers import BaseLenderSerializerWithUsers

User = get_user_model()


class LenderSignupView(views.APIView):
    """Lender can only signup once with a user; next they have to add users instead"""

    serializer_class = BaseLenderSerializerWithUsers

    @extend_schema(responses=({"201": BaseLenderSerializerWithUsers}))
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        lender = serializer.save()
        user = lender.user_set.first()  # Or filter by admin permission
        # Do something with verification of email
        current_site = get_current_site(request)
        email_kwargs = {
            "subject": "Verify your email address",
            "template": "email/verify_email.html",
            "message_context": {
                "username": user.username,
                "domain": current_site.domain,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": account_activation_token.make_token(user),
            },
            "to": [user.email],
        }
        send_mail_async.delay(**email_kwargs)
        return Response({}, status=status.HTTP_201_CREATED)


class LenderLoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        return Response(get_token_for_user(user), status=status.HTTP_200_OK)


class LenderProfileView(generics.RetrieveAPIView):
    permission_classes = [isLenderUser]
    serializer_class = BaseLenderSerializerWithUsers
    queryset = Lender.objects.all()


class LenderAddUserView(views.APIView):
    permission_classes = [isLenderAdminUser]
    serializer_class = UserSerializer

    def post(self, request):
        lender = request.user.company
        data = request.data
        users_serializer = self.serializer_class(
            data=data, many=True, context={"company": lender}
        )
        users_serializer.is_valid(raise_exception=True)
        users = users_serializer.save()
        current_site = get_current_site(request)
        email_kwargs = {
            "subject": "Change Password Alert",
            "template": "change_password.html",
            "message_context": {
                "domain": current_site.domain,
            },
            "to": [user.email for user in users],
        }
        # Use celery to send messages
        send_mail_async.delay(**email_kwargs, mass=True)

        return Response(status=status.HTTP_200_OK)
