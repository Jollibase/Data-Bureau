from django.urls import path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)

from apps.client import views

urlpatterns = [
    path("signup/", views.LenderSignupView.as_view(), name="lender_signup"),
    path("login/", views.LenderLoginView.as_view(), name="lender_login"),
    path("me/<int:pk>/", views.LenderProfileView.as_view(), name="lender_profile"),
    path("me/add_user/", views.LenderAddUserView.as_view(), name="lender_add_user"),
    # YOUR PATTERNS
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"
    ),
]
