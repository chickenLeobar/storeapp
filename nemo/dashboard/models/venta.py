from django.db import models

from .product import Product
from django.core.validators import MinValueValidator
from enum import Enum, unique
from typing import OrderedDict


@unique
class MethodCont(Enum):
    MONT = "MONT"


class Venta(models.Model):
    fecha_venta = models.DateTimeField(auto_now=True)
    # true is necessary to prevent Erro "required field" in serializer
    monto_total = models.DecimalField(max_digits=10, decimal_places=4, blank=True)
    # IDEA: changue this for contact :)

    cliente = models.ForeignKey(
        'Usuario', related_name="clients", on_delete=models.CASCADE, null=True, blank=True)
    serie_documento = models.CharField(max_length=16, null=True)
    tipo_documento = models.CharField(max_length=8, null=True)
    vendedor = models.ForeignKey(
        'Usuario', related_name="seller", on_delete=models.CASCADE, null=True, blank=True)
    meta =  models.JSONField(default=dict)



class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, blank=True)
    producto = models.ForeignKey(Product, on_delete=models.CASCADE)
    cantidad = models.IntegerField(validators=[MinValueValidator(0)])

    @staticmethod
    def total_mont(detail: OrderedDict, count: float) -> float:
        # evaluate product
        pr: Product = detail.get('producto')
        total = pr.mont_exist * count
        if pr.method_cont == MethodCont.MONT.name:
            total = count
        return total
