import os

from celery import Celery
from dotenv import load_dotenv

from django.conf import settings

load_dotenv()

environment = os.environ.get("ENVIRONMENT")

if environment == "development":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.local")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.prod")

app = Celery("APP")

# read config from Django settings, the CELERY namespace would make celery
# config keys has `CELERY` prefix
app.config_from_object("django.conf:settings", namespace="CELERY")

# discover and load tasks.py from from all registered Django apps
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
