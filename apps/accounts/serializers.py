from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Lender, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_active",
        )
        extra_kwargs = {"password": {"write_only": True}}


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data["email"]
        password = data["password"]
        user = authenticate(self.context["request"], email=email, password=password)
        if not user:
            raise serializers.ValidationError("Incorrect Email/Password")
        data["user"] = user

        return data


# Check when last borrower borrowed
# Borrower info only needs to be updated, they don't need to login
