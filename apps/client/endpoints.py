from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from apps.accounts.models import Lender
from apps.accounts.serializers import LoginSerializer
from apps.client.serializers import (BaseLenderSerializer,
                                     CreateLenderSerializer)
from apps.lib.utils import get_token_for_user


class UserVerification(views.APIView):
    parser_classes = []

    def post(self, request):
        """
        expects bvn, picture, identifying national document
        """
        pass
