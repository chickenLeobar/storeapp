from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from ..managers import CustomUserManger



class Usuario(AbstractBaseUser, PermissionsMixin):
    apellidos = models.CharField(max_length=30, null=True)
    nombres = models.CharField(max_length=150, null=True)
    ciudad = models.CharField(max_length=100, null=True)
    celular = models.CharField(max_length=15, null=True)
    # auth
    email = models.EmailField(verbose_name="Email address", unique=True)
    data_joined = models.DateTimeField(default=timezone.now)
    validated =  models.BooleanField(default=False ,blank=True)
    USERNAME_FIELD = "email"

    objects = CustomUserManger()

    def __str__(self):
        return self.nombres
