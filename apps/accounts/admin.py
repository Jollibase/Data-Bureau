from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import forms
from django.forms import fields
from hijack.contrib.admin import HijackUserAdminMixin

from .models import User, Lender, UserProfile, ContactInfo


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    max_num = 1
    can_delete = False
    readonly_fields = ("created", "updated")


class MyUserAdmin(HijackUserAdminMixin, UserAdmin):
    inlines = [UserProfileInline]


admin.site.register(User, MyUserAdmin)
admin.site.register(Lender)
admin.site.register(ContactInfo)
