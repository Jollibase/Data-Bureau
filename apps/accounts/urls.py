from django.urls import path

from apps.accounts import views

urlpatterns = [
    path(
        "accounts/activate/<str:uidb64>/<str:token>",
        views.ActivateUserView.as_view(),
        name="activate",
    ),
    path(
        "accounts/change_password/",
        views.ChangePasswordView.as_view(),
        name="change_password",
    ),
]
