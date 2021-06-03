
from django.db import models


class TipoDocumento(models.Model):
    descripcion = models.CharField(max_length=10)
