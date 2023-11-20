from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.response import Response
from rest_framework import views, generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from .serializers import (
    EmailWaitListSerializer,
    UserProfileSerializer,
    ContactInfoSerializer,
)
from .models import UserProfile, EmailWaitList

User = get_user_model()


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp) + str(user.is_active)


account_activation_token = TokenGenerator()


class ActivateUserView(views.APIView):
    def get(self, request, uidb64, token):
        channel_layer = get_channel_layer()
        ws_message = {"type": "verify_user", "data": {"verified": False}}

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            ws_message["data"]["verified"] = True
        channel_name = f"channel-{user.id}"
        async_to_sync(channel_layer.group_send)(channel_name, ws_message)
        return Response(
            {"message": "Activation Done"},
        )


class ChangePasswordView(views.APIView):
    def get(self, request):
        return Response("Good!")


class EmailWaitListView(views.APIView):
    serializer_class = EmailWaitListSerializer

    def get(self, request):
        count = EmailWaitList.objects.count()
        return Response({"count": count})

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)


class ContactView(views.APIView):
    def post(self, request):
        data = request.data
        serializer = ContactInfoSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("Message received")
