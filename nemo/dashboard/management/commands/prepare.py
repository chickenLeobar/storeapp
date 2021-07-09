from typing import Any, Optional, Text
from django.core.management.base import BaseCommand, CommandParser
from ...models import Usuario


class Command(BaseCommand):
    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--createuser", action="store_true", default=False, help="create superuser for env")
        return super().add_arguments(parser)

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        if options['createuser']:
            print("generating user for default")
            if not Usuario.objects.get(email="test@gmail.com"):
                Usuario.objects.create_superuser("test@gmail.com", "123456")
                print("success created user")
            else:
                print("usuario already exist")





