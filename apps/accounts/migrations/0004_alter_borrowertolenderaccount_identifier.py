# Generated by Django 4.1.7 on 2023-02-15 21:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0003_remove_borrowerprofile_user_alter_user_role"),
    ]

    operations = [
        migrations.AlterField(
            model_name="borrowertolenderaccount",
            name="identifier",
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
