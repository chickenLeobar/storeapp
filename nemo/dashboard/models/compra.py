from operator import mod
from django.db import models

from .product import Product


from .contact import Contact

from django.core.validators import MinValueValidator
"""
Proveedor
- Nombres
- Dirección
- fecha_de_registro
- Descripción
- correo electronico
"""




class Compra(models.Model):
    fecha_compra = models.DateField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=4)
    proveedor = models.ForeignKey(Contact, null=True , blank=True , on_delete=models.DO_NOTHING)
    serie_documento = models.CharField(max_length=16, null=True)


class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField(validators=[MinValueValidator(0)])
    costo = models.FloatField()
