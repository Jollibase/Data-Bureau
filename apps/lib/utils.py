from celery import shared_task
from celery.signals import task_postrun
from django.contrib.auth import get_user_model
from django.core.mail import send_mail, send_mass_mail
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def send_mail_user(subject, template, message_context, to, from_user=None):
    body = render_to_string(template, message_context)
    send_mail(subject, body, from_user, to, fail_silently=False, html_message=body)


def send_mass_mail_user(subject, template, message_context, to, from_user=None):
    # Update message_context with user
    users = User.objects.filter(email__in=to)
    user_message_context = [
        {**message_context, "username": user.username, "email": user.email}
        for user in users
    ]
    message_tuple = (
        (
            subject,
            render_to_string(template, message_context),
            from_user,
            [message_context["email"]],
        )
        for message_context in user_message_context
    )
    send_mass_mail(message_tuple, fail_silently=False)


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@shared_task(
    bind=True,
    autoretry_for=(Exception,),
    retry_kwargs={"max_retries": 5, "countdown": 5},
)
def send_mail_async(self, subject, template, message_context, to, mass=False):
    if mass:
        send_mass_mail_user(subject, template, message_context, to)
    else:
        send_mail_user(subject, template, message_context, to)


@shared_task(bind=True)
def divide(self, a, b):
    return a / b
