from typing import Any, Optional

from django.core.management.commands import makemigrations


class Command(makemigrations.Command):
    def handle(self, *app_labels: str, **options: Any) -> Optional[str]:
        self.stdout.write(*app_labels)
        options["name"] = "m"
        return super().handle(*app_labels, **options)
