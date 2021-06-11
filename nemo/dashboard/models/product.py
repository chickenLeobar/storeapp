import re
import cloudinary
from django.db import models

# - imagen
# - descripcion
# - price
# - name
# - cantidad
# - created
# - stockc

from django.core.validators import MinValueValidator
unit = (
    ("KG", "kilogramo"),
    ("Lt", "Listro"),
    ("und", "unidad")
)


class Brand(models.Model):
    name = models.CharField(max_length=150, null=False, verbose_name="Nombre")
    # business = models.ForeignKey('Negocio', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200, null=False,
                            verbose_name="Nombre")
    description = models.TextField(max_length=800)
    business = models.ForeignKey('Negocio', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProductManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def filter_products(self, keyword: str):
        qs = self.get_queryset()

        return qs


class Product(models.Model):
    name = models.CharField(max_length=150, null=False, verbose_name="Nombre")
    description = models.TextField(null=False, max_length=250)

    stock = models.IntegerField(
        validators=[MinValueValidator(0, "Min value is 0")], null=True)

    created = models.DateTimeField(auto_created=True, auto_now_add=True)

    mont_enter = models.DecimalField(max_digits=9, decimal_places=2)
    mont_enter = models.DecimalField(max_digits=9, decimal_places=2)

    method_cont = models.CharField(
        choices=unit, verbose_name="Unidad", default="und", max_length=50)
    brand = models.ForeignKey(
        Brand, on_delete=models.CASCADE, verbose_name="Marca")

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name='Categoria')

    # ad images
    images = models.JSONField(null=False, default=list)

    def __str__(self):
        return self.name
