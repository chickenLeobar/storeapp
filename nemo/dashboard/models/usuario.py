from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from ..managers import CustomUserManger
from .shared import TipoDocumento


class Usuario(AbstractBaseUser, PermissionsMixin):
    apellidos = models.CharField(max_length=30, null=True)
    nombres = models.CharField(max_length=150, null=True)
    ciudad = models.CharField(max_length=100, null=True)
    celular = models.CharField(max_length=15, null=True)
    # auth
     
    email = models.EmailField(verbose_name="Email address", unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_bussiness = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    data_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"

    objects = CustomUserManger()

    def __str__(self):
        return self.name
