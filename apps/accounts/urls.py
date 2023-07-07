from django.urls import path

from apps.accounts import views

urlpatterns = [
    path(
        "activate/<str:uidb64>/<str:token>",
        views.ActivateUserView.as_view(),
        name="activate",
    ),
    path("me/", views.UserProfileAPIView.as_view(), name="user_profile"),
    path(
        "change_password/",
        views.ChangePasswordView.as_view(),
        name="change_password",
    ),
    path(
        "join-waitlist/",
        views.EmailWaitListView.as_view(),
        name="change_password",
    ),
]
