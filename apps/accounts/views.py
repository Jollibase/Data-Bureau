from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from .serializers import EmailWaitListSerializer

User = get_user_model()


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp) + str(user.is_active)


account_activation_token = TokenGenerator()


class ActivateUserView(APIView):
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
        async_to_sync(channel_layer.group_send)(user.id, ws_message)
        return Response({"message": "Activation"})


class ChangePasswordView(APIView):
    def get(self, request):
        return Response("Good!")


class EmailWaitListView(APIView):
    serializer_class = EmailWaitListSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
