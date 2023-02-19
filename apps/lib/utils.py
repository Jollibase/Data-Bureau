from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken


def send_mail_user(subject, template, message_context, to, from_user=None):
    body = render_to_string(template, message_context)
    send_mail(subject, body, from_user, to, fail_silently=False)


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
