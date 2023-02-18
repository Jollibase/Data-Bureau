from rest_framework import status, views, generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from apps.client.serializers import CreateLenderSerializer, BaseLenderSerializer
from apps.accounts.serializers import LoginSerializer
from apps.lib.utils import get_token_for_user
from apps.accounts.models import Lender


class UserVerification(views.APIView):
    parser_classes = []

    def post(self, request):
        """
        expects bvn, picture, identifying national document
        """
        pass
