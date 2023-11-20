from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.db import transaction
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status, views, decorators
from rest_framework.response import Response

from apps.accounts.models import Lender
from apps.accounts.serializers import LoginSerializer, UserSerializer
from apps.accounts.views import account_activation_token
from apps.lib.utils import get_token_for_user, send_mail_async

from .permissions import isLenderAdminUser, isLenderUser
from .serializers import BaseLenderSerializerWithUsers, RequestLenderSerializer

User = get_user_model()


def send_user_verification_mail(request, user):
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
    send_mail_async.apply_async(kwargs=email_kwargs, queue="high_priority")
    # Only run when db transaction is successful
    # Atomicity not working check later


class LenderSignupView(views.APIView):
    """Lender can only signup once with a user; next they have to add users instead"""

    serializer_class = RequestLenderSerializer

    @extend_schema(responses=({"201": RequestLenderSerializer}))
    @transaction.atomic
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        lender = serializer.save()
        user = lender.userprofile_set.first().user  # Or filter by admin permission
        # Do something with verification of email
        transaction.on_commit(lambda: send_user_verification_mail(request, user))
        return Response(
            BaseLenderSerializerWithUsers(lender).data, status=status.HTTP_201_CREATED
        )


class LenderLoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        return Response(get_token_for_user(user), status=status.HTTP_200_OK)


class LenderProfileView(views.APIView):
    permission_classes = [isLenderUser]
    serializer_class = BaseLenderSerializerWithUsers

    def get(self, request):
        lender = request.user.userprofile.company
        serializer = BaseLenderSerializerWithUsers(lender)
        return Response(serializer.data)


class LenderAddUserView(views.APIView):
    permission_classes = [isLenderAdminUser]
    serializer_class = UserSerializer

    def post(self, request):
        lender = request.user.userprofile.company
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


@decorators.api_view(("GET",))
def resend_verification(request):
    user_email = request.GET.get("email").lower()
    try:
        user = User.objects.get(email=user_email)
        send_user_verification_mail(request, user)
    except Exception as e:
        raise e
    return Response({})
