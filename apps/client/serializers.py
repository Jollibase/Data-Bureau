from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.accounts.models import Lender, LenderPackageMap, Package
from apps.accounts.serializers import UserSerializer

User = get_user_model()


class BaseLenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        exclude = ("uuid", "created", "updated", "secret")


class CreateLenderSerializer(BaseLenderSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        validated_user_obj = validated_data.pop("user")
        lender_company = super().create({**validated_data})
        user = User.objects.create_user(**validated_user_obj, role=User.LENDER)
        default_package = Package.objects.first()
        p_map = LenderPackageMap.objects.create(
            lender=lender_company,
            package=default_package,
        )
        p_map.users.add(user)

        return lender_company
