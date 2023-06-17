from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import EmailWaitList, Lender, User, UserProfile


class UserSerializer(serializers.ModelSerializer):
    is_lender_admin = serializers.SerializerMethodField()
    password = serializers.CharField(required=False)

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
            "is_lender_admin",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def get_is_lender_admin(self, instance):
        return instance.groups.filter(name="Lender's Admin").exists()

    def create(self, validated_data):
        # If there are no passwords, create user with .create
        lender = self.context.get("company", None)
        if validated_data.get("password"):
            return super().create(validated_data)
        user = User.objects.create(**validated_data)
        UserProfile.objects.create(role=User.LENDER, company=lender, user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = "__all__"


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


class EmailWaitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailWaitList
        fields = "__all__"
