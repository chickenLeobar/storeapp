from ..models import Negocio
from rest_framework import serializers

class NegocioSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Negocio
        fields = '__all__'



