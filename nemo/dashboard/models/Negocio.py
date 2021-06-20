from django.db import models

class Negocio(models.Model):
    name = models.CharField(max_length=250, null=False)
    image = models.JSONField(default=dict)
    description = models.TextField(max_length=500, null=True)
    direction = models.CharField(max_length=350, null=False)
    social_reason = models.CharField(max_length=350, null=False)
    meta = models.JSONField(default=dict)
    # Ultima vez que estuvo funcinando el negocio
    # Ejemplo -> Utilma vez el 020/20/250

    last_open = models.DateTimeField(blank=True, auto_now_add=True)
    date_updated = models.DateTimeField(auto_now_add=True , blank=True)
    date_created =  models.DateTimeField(auto_now=True , blank=True)

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        unique_together = [['name' , 'direction']]

