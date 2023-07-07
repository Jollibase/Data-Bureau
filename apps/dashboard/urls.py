from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.dashboard import endpoints as dash


router = DefaultRouter()
router.register(r"", dash.DashboardViewset, basename="dashboard")

urlpatterns = [] + router.urls
