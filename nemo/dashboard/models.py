
from django.db import models

from .models import (Usuario , Negocio)

# from .models import *

# class Usuario(models.Model):
#     tipo_documento = models.ForeignKey(
#         'TipoDocumento')
#     numero_documento = models.CharField(max_length=15)
#     nombre_empresa = models.CharField(max_length=30)
#     apellidos = models.CharField(max_length=30, null=True)
#     direccion = models.CharField(max_length=150, null=True)
#     ciudad = models.CharField(max_length=100, null=True)
#     celular = models.CharField(max_length=15, null=True)
#     correo = models.EmailField(max_length=130, blank=True, null=True)


# # # relation


# class Proveedor(models.Model):
#     numero_documento = models.CharField(max_length=15)
#     tipodocumento = models.ForeignKey(
#         'TipoDocumento', on_delete=models.DO_NOTHING, default=1)
#     nombre_empresa = models.CharField(max_length=25)
#     nombres = models.CharField(max_length=30, null=True)
#     direccion = models.CharField(max_length=150, null=True)
#     celular = models.CharField(max_length=15, null=True)
#     correo = models.EmailField(max_length=130, blank=True, null=True)


# # # realation
