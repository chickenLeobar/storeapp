from django.db import models
from ..models.Negocio import Negocio


class TypeDocuement(models.TextChoices):
    DNI = 'DNI', ('DNI')
    RUC = 'RUC', ('RUC')


class TypeContact(models.TextChoices):
    PROVEEDOR = 'PROVIDER', ('PROVIDER')
    CLIENT = 'CLIENT', ('CLIENTE')


class Contact(models.Model):
    name = models.CharField(max_length=500, null=False, blank=True)
    type_document = models.CharField(
        null=True, max_length=150, blank=True, choices=TypeDocuement.choices, default=TypeDocuement.DNI)
    num_document = models.CharField(max_length=80, null=True, blank=True)
    direction = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(null=True ,max_length=50, blank=True)

    # type contact =  PROVIDE | CLIENT

    type_contact = models.CharField(
        max_length=150, null=True, blank=True, choices=TypeContact.choices, default=TypeContact.CLIENT)

    notes = models.TextField(max_length=400, null=True, blank=True)

    create = models.DateTimeField(auto_now_add=True)

    # busieness for this  contact
    business = models.ForeignKey(
        Negocio, null=False, blank=False, on_delete=models.CASCADE)

    class Meta:
        #unique_together =[["email" , 'business' ,'type_contact']]
        pass
