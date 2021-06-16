from rest_framework import serializers
from dashboard.models.venta import Venta , DetalleVenta
from dashboard.models import DetalleVenta
from django.db.models import  Model

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['venta', 'producto', 'cantidad']


class VentaSerializer(serializers.ModelSerializer):
    details = serializers.ListField(child=DetailSerializer())

    class Meta:
        model = Venta
        fields = ['fecha_venta', 'monto_total',
                  'cliente', 'serie_documento',
                  'tipo_documento', 'vendedor' , 'details']

    def create(self, validated_data : dict ):
        # retrieve details
        details = validated_data.get('details' ,  [])
        print(details)
        # save sale
        sale = Venta.objects.create(**validated_data)

        # save details
        print(sale)

        # update small box of the current day

        # emit  event to the front-end

        # return ok :)

        return sale
