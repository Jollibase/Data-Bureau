from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


class isLenderUser(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        lender = request.user.company
        try:
            if obj.uuid == lender.uuid:
                return True
        except AttributeError:
            return False
        return False

    def has_permission(self, request, view):
        return (
            super().has_permission(request, view) and request.user.role == User.LENDER
        )


class isLenderAdminUser(isLenderUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.groups.filter(
            name="Lender's Admin"
        )
