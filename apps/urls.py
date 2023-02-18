from django.urls import include, path

from apps.accounts import urls as account_urls
from apps.client import urls as client_urls

urlpatterns = [
    path("client/", include(client_urls)),
    path("accounts/", include(account_urls)),
]
