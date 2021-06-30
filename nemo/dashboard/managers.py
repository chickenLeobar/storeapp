from django.contrib.auth.base_user import BaseUserManager


class CustomUserManger(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password
        """
        if (not email):
            raise ValueError(('El email debe ser proveido'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        user.save(self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        return self.create_user(email, password, **extra_fields)

    def exist_user(self, email: str):
        return super().get_queryset().filter(email=email).first()
