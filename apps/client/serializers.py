from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField

from apps.accounts.models import Lender, LenderPackageMap, Package, UserProfile
from apps.accounts.serializers import UserSerializer, UserProfileSerializer

User = get_user_model()


class BaseLenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        exclude = ("created", "updated", "secret")


class BaseLenderSerializerWithUsers(BaseLenderSerializer):
    users = UserProfileSerializer(source="userprofile_set", many=True)
    public = serializers.ReadOnlyField()


class RequestLenderSerializer(serializers.Serializer):
    user = UserSerializer()
    address = serializers.CharField()
    name = serializers.CharField()
    phone = PhoneNumberField()

    def create(self, validated_data):
        validated_user = validated_data.pop("user")
        lender = Lender.objects.create(**validated_data)
        # CREATE USER
        user = User.objects.create_user(**validated_user)
        UserProfile.objects.create(user=user, role=UserProfile.LENDER, company=lender)
        user.is_active = False
        user.save()
        # Assign user 'Lender's Admin' permission
        user.groups.add(Group.objects.get(name="Lender's Admin"))
        default_package = Package.objects.get(name="Basic")
        p_map = LenderPackageMap.objects.create(
            lender=lender,
            package=default_package,
        )
        p_map.users.add(user)

        return lender
