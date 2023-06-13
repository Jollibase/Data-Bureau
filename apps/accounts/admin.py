from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from hijack.contrib.admin import HijackUserAdminMixin

from .models import User, Lender 


class MyUserAdmin(HijackUserAdminMixin, UserAdmin):
    pass


admin.site.register(User, MyUserAdmin)

admin.site.register(Lender)
