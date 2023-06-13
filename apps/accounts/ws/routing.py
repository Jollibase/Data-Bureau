from django.urls import path, re_path

from . import consumers

urlpatterns = [
    path(
        "ws/verify/<user_id>/",
        consumers.VerifyUserConsumer.as_asgi(),
        name="user_verification_ws",
    ),
]
