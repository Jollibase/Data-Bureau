import factory

from apps.dashboard.models import Dashboard, Widget


class DashboardFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Dashboard

    settings = {"type": "unknown"}


class WidgetFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Widget
