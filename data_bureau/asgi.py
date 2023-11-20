"""
ASGI config for app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from dotenv import load_dotenv

from django.core.asgi import get_asgi_application

from apps.accounts.ws import routing

load_dotenv()

environment = os.environ.get("ENVIRONMENT")

if environment == "development":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.local")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.prod")


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(routing.urlpatterns))
        ),
    }
)
