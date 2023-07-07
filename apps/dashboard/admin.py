from django.contrib import admin

from apps.dashboard.models import Dashboard


@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    pass
