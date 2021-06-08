from django.db import models

from conf.utils import drive_upload_image

class Negocio(models.Model):
    nombre =  models.CharField(max_length=250, null=False)
    decripcion =  models.TextField(max_length=500 , null=True)
    imagen =  models.ImageField(upload_to=drive_upload_image)
    direction =  models.CharField(max_length=350, null=False)

    def __str__(self) -> str:
        return self.nombre
    class Meta:
        pass
