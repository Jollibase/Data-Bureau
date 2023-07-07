from rest_framework import serializers

from apps.dashboard.models import Dashboard


class DashboardSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source="owner.username", read_only=True)
    settings = serializers.JSONField(read_only=True)

    class Meta:
        model = Dashboard
        exclude = ("is_active",)

    def create(self, validated_data):
        owner = self.context.get("user")
        return Dashboard.objects.create(**validated_data, owner=owner, is_active=True)


class DashboardDeleteSerializer(serializers.Serializer):
    ids = serializers.PrimaryKeyRelatedField(
        queryset=Dashboard.objects, many=True, allow_empty=False
    )
