import uuid

from django.db import models
from django.contrib.auth import get_user_model, models as auth_models
from apps.lib.abstract_models import DatetimeMixin

User = get_user_model()


# Create your models here.
class Dashboard(DatetimeMixin):
    name = models.CharField(max_length=255, blank=False, null=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    sharee = models.ManyToManyField(
        User,
        null=True,
        blank=True,
        related_name="shared_dashboard",
    )
    settings = models.JSONField(default=dict)
    is_active = models.BooleanField(default=True)
    is_readonly = models.BooleanField(default=False)
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, auto_created=True, editable=False
    )

    def is_dashboard_owner(self, user):
        return self.owner == user

    class Meta:
        indexes = [models.Index(fields=["is_active"])]

    def __str__(self) -> str:
        return f"{self.name} [{self.owner.username}]"


class Widget(DatetimeMixin):
    name = models.CharField(max_length=255)
    permissions = models.ManyToManyField(auth_models.Group, blank=True)
    widget_id = models.CharField(max_length=255)
    description = models.TextField(max_length=1024, blank=True, null=True)
    defaults = models.JSONField(blank=True, null=True, default=dict)
    # thumbnail = models.FileField(
    #     upload_to=get_s3_file_path, validators=[FileExtensionValidator(["png", "jpg", "svg"])], blank=True, null=True
    # )

    # @property
    # def thumbnail_url(self):
    #     if self.thumbnail and hasattr(self.thumbnail, "url"):
    #         return self.thumbnail.url

    #     return None

    def __str__(self):
        return f"{self.name}"
