from rest_framework import status, views, generics, permissions
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from apps.client.serializers import CreateLenderSerializer, BaseLenderSerializer
from apps.accounts.serializers import LoginSerializer
from apps.lib.utils import get_token_for_user
from apps.accounts.models import Lender


User = get_user_model()


def get_lender_auth():
    pass


class LenderSignupView(views.APIView):
    """Lender can only signup once with a user; next they have to add users instead"""

    serializer_class = CreateLenderSerializer

    @extend_schema(responses=({"201": CreateLenderSerializer}))
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        lender = serializer.save()
        # Do something with verification of email
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
