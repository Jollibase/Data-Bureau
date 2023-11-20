from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import EmailWaitList, ContactInfo, User, UserProfile


class UserSerializer(serializers.ModelSerializer):
    is_lender_admin = serializers.SerializerMethodField()
    password = serializers.CharField(required=False, write_only=True)

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

    def get_is_lender_admin(self, instance):
        return instance.groups.filter(name="Lender's Admin").exists()

    def create(self, validated_data):
        # If there are no passwords, create user with .create
        lender = self.context.get("company", None)
        if validated_data.get("password"):
            user = super().create(validated_data)
        else:
            user = User.objects.create(**validated_data)
        UserProfile.objects.create(role=User.LENDER, company=lender, user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = representation.pop("user")
        representation.update(user)
        return representation


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

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ContactInfo
        fields ='__all__'
