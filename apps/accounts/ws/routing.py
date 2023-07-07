from django.urls import path

from . import consumers

urlpatterns = [
    path(
        "ws/verify/<user_id>/",
        consumers.VerifyUserConsumer.as_asgi(),
        name="user_verification_ws",
    ),
]
