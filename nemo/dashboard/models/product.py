from django.db import models
# - imagen
# - descripcion
# - price
# - name
# - cantidad
# - created
# - stock

from django.core.validators import MinValueValidator
unit = (
    ("KG", "kilogramo"),
    ("Lt", "Listro"),
    ("und", "unidad")
)


class Brand(models.Model):
    name = models.CharField(max_length=150, null=False, verbose_name="Nombre")
    
    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200, null=False,
                            verbose_name="Nombre")
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150, null=False, verbose_name="Nombre")
    description = models.TextField(null=False, max_length=250)
    price = models.FloatField(null=False, verbose_name="Precio", help_text="")
    cantidad = models.IntegerField(
        validators=[MinValueValidator(0, "min value violated")])
    created = models.DateTimeField(auto_created=True, auto_now_add=True)
    unity = models.CharField(
        choices=unit, verbose_name="Unidad", default="und", max_length=50)
    brand = models.ForeignKey(
        Brand, on_delete=models.CASCADE, verbose_name="Marca")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name='Categoria')

    def __str__(self):
        return self.name
