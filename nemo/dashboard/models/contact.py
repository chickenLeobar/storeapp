from django.db import models
from ..models.Negocio import Negocio

class TypeDocuement(models.TextChoices):
    DNI = 'DNI', ('DNI')
    RUC = 'RUC', ('RUC')

class TypeContact(models.TextChoices):
    PROVEEDOR = 'Proveedor', ('PROVEEDOR')
    CLIENT = 'Cliente', ('CLIENTE')


class Contact(models.Model):
    name = models.CharField(max_length=500, null=False, blank=True)
    type_document = models.CharField(null=True,max_length=150, blank=True, choices=TypeDocuement.choices, default=TypeDocuement.DNI)
    num_document = models.CharField(max_length=80, null=False, blank=True, unique=True)
    direction = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(null=True, blank=True, unique=True)

    # type contact =  PROVIDE | CLIENT

    type_contact = models.CharField(max_length=150, null=True, blank=True , choices=TypeContact.choices , default=TypeContact.CLIENT)

    notes = models.TextField(max_length=400, null=True, blank=True)

    # busieness for this  contact
    business =  models.ForeignKey(Negocio , null=False , blank=False , on_delete=models.CASCADE)

    class Meta:
        unique_together = [['name', 'num_document']]

