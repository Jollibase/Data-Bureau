import uuid

from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class DatetimeMixin(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    LENDER = 0
    BUREAUER = 1
    BUREAUER_ADMIN = 2
    ROLES = (
        (LENDER, "Lender"),
        (BUREAUER, "Bureauer"),
        (BUREAUER_ADMIN, "Admin"),
    )
    REQUIRED_FIELDS = ["first_name", "last_name"]
    USERNAME_FIELD = "email"

    first_name = models.CharField("first name", max_length=150, blank=False)
    last_name = models.CharField("last name", max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    role = models.PositiveSmallIntegerField(choices=ROLES, blank=False, null=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.username = self.email
        return super().save(*args, **kwargs)


class Lender(DatetimeMixin):
    """Holds company lender information"""

    name = models.CharField(max_length=150, blank=False, null=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    address = models.TextField(blank=False)
    phone = PhoneNumberField()
    public = models.CharField(
        "Public key for encrypting user data",
        max_length=150,
        blank=False,
        null=False,
    )
    secret = models.CharField(
        "Secret key for decrypting user data passed across",
        max_length=150,
        blank=False,
        null=False,
    )
    # should hold sub domain prefix that would be used to validate against public access key
    # Hold signal for logging when certain changes
    # Decide how to create secret key and private key

    def save(self, *args, **kwargs):
        # Use Identifier to create public key, assign group to user
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Package(models.Model):
    name = models.CharField(max_length=150)
    permissions = models.ManyToManyField(Group, blank=True, related_name="groups")
    description = models.TextField()
    is_active = models.BooleanField(default=True)


class LenderPackageMap(DatetimeMixin):
    package = models.ForeignKey(
        Package, related_name="package", on_delete=models.CASCADE
    )
    lender = models.ForeignKey(Lender, related_name="lender", on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name="user")

    def __str__(self):
        return f"{self.lender} {self.package}"


class BorrowerProfile(DatetimeMixin):
    """Alias Lendee/Borrower"""

    bvn = models.PositiveBigIntegerField("User verifiable BVN", blank=False, null=False)
    nin = models.PositiveBigIntegerField("User verifiable BVN", blank=False, null=False)
    others = models.JSONField(default=str)

    def get_credit_score(self):
        pass

    def __str__(self):
        return self.user.get_full_name()


class BorrowertoLenderAccount(DatetimeMixin):
    """Should contain data that attaches the borrower to their lenders"""

    borrower = models.ForeignKey(BorrowerProfile, on_delete=models.PROTECT)
    lender = models.ForeignKey(Lender, on_delete=models.PROTECT)
    identifier = models.CharField(max_length=150, unique=True)


class Auth:
    def __init__(self, user):
        self.user = user

    def get_package_groups(self):
        package_groups = list(
            LenderPackageMap.objects.filter(user=self.user).values_list(
                "package__permission__id", "package__permissions__name"
            )
        )
        return [{"id": id, "name": name} for id, name in package_groups]

    @property
    def groups(self):
        package_groups = self.get_package_groups()

        try:
            groups = self._groups
            groups.extend(package_groups)
        except AttributeError:
            groups = list(self.user.groups.values())
            groups.extend(package_groups)

        self._groups = groups
        return self._groups

    @staticmethod
    def has_permission(groups, name):
        return bool([x for x in groups if x["name"] == name])


User.auth = property(Auth)
