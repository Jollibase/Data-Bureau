# Generated by Django 4.1.7 on 2023-02-21 23:25

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0007_m"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="borrowerprofile",
            options={"ordering": ("created",)},
        ),
        migrations.AlterModelOptions(
            name="borrowertolenderaccount",
            options={"ordering": ("created",)},
        ),
        migrations.AlterModelOptions(
            name="lender",
            options={"ordering": ("created",)},
        ),
        migrations.AlterModelOptions(
            name="lenderpackagemap",
            options={"ordering": ("created",)},
        ),
    ]
