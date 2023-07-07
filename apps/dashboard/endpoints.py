from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.dashboard.models import Dashboard
from apps.dashboard.serializers import DashboardSerializer, DashboardDeleteSerializer


class DashboardViewset(viewsets.ModelViewSet):
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Dashboard.objects.filter(
            Q(owner=self.request.user) | Q(sharee=self.request.user),
            is_active=True,
        )

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["delete"])
    def delete(self, request):
        serializer = DashboardDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.validated_data["ids"]
        for dashboard in ids:
            if dashboard.is_dashboard_owner(request.user):
                dashboard.is_active = False
            else:
                dashboard.sharee.remove(request.user)
            dashboard.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
