from django.db import models

from .product import Product
from django.core.validators import MinValueValidator


class Venta(models.Model):
    fecha_venta = models.DateField(auto_now_add=True)
    monto_total = models.DecimalField(max_digits=10, decimal_places=4)
    cliente = models.ForeignKey(
        'Usuario', related_name="clients", on_delete=models.CASCADE , null=True)
    serie_documento = models.CharField(max_length=16, null=True)
    tipo_documento = models.CharField(max_length=8, null=True)
    vendedor = models.ForeignKey(
        'Usuario', related_name="seller", on_delete=models.CASCADE, null=True)


class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField(validators=[MinValueValidator(0)])
