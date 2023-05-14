from django.urls import path

from apps.client import views

urlpatterns = [
    path("signup/", views.LenderSignupView.as_view(), name="lender_signup"),
    path("login/", views.LenderLoginView.as_view(), name="lender_login"),
    path("me/", views.LenderProfileView.as_view(), name="lender_profile"),
    path("me/add_user/", views.LenderAddUserView.as_view(), name="lender_add_user"),
]
