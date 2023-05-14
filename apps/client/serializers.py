from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers

from apps.accounts.models import Lender, LenderPackageMap, Package
from apps.accounts.serializers import UserSerializer

User = get_user_model()


class BaseLenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        exclude = ("uuid", "created", "updated", "secret")


class BaseLenderSerializerWithUsers(BaseLenderSerializer):
    users = UserSerializer(source="user_set", many=True)
    public = serializers.ReadOnlyField()

    def create(self, validated_data):
        validated_user_obj = validated_data.pop("user_set")
        lender = super().create({**validated_data})
        user = User.objects.create_user(
            **validated_user_obj[0], role=User.LENDER, company=lender
        )
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
