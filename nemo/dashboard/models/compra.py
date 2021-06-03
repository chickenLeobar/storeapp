from operator import mod
from django.db import models
from .shared import TipoDocumento
from .product import Product

from django.utils import timezone
from django.core.validators import MinValueValidator
"""
Proveedor
- Nombres
- Dirección
- fecha_de_registro
- Descripción
- correo electronico
"""


class Proveedor(models.Model):
    nombre = models.CharField(max_length=150, unique=True)
    direccion = models.CharField(max_length=250,  null=True)
    fecha_registro = models.DateTimeField(default=timezone.now)
    decripción = models.TextField(max_length=150)
    correo = models.EmailField()
    phone = models.CharField(max_length=250)


class Compra(models.Model):
    fecha_compra = models.DateField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=4)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    serie_documento = models.CharField(max_length=16, null=True)
    tipo_documento = models.ForeignKey(
        TipoDocumento, on_delete=models.DO_NOTHING)


class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField(validators=[MinValueValidator(0)])
    costo = models.FloatField()
