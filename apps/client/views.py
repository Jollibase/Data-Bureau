from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from apps.accounts.models import Lender
from apps.accounts.serializers import LoginSerializer
from apps.accounts.views import account_activation_token
from apps.client.serializers import (BaseLenderSerializer,
                                     CreateLenderSerializer)
from apps.lib.utils import get_token_for_user, send_mail_user

User = get_user_model()


class LenderSignupView(views.APIView):
    """Lender can only signup once with a user; next they have to add users instead"""

    serializer_class = CreateLenderSerializer

    @extend_schema(responses=({"201": CreateLenderSerializer}))
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        lender = serializer.save()
        user = lender.user_set.first()
        # Do something with verification of email
        current_site = get_current_site(request)
        email = {
            "subject": "Verification Mail",
            "template": "verify_email.html",
            "message_context": {
                "user": user,
                "domain": current_site.domain,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": account_activation_token.make_token(user),
            },
            "to": [user.email],
        }
        send_mail_user(**email)
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
    permission_classes = [permissions.AllowAny]
    serializer_class = BaseLenderSerializer
    queryset = Lender.objects.all()
