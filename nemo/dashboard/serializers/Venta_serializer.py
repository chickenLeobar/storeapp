from rest_framework import serializers
from dashboard.models.venta import Venta, DetalleVenta
from dashboard.models import DetalleVenta
from functools import reduce
from typing import OrderedDict, Any
from rest_framework.exceptions import ValidationError, APIException


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['venta', 'producto', 'cantidad']


class VentaSerializer(serializers.ModelSerializer):
    details = serializers.ListField(child=DetailSerializer(), required=False)

    class Meta:
        model = Venta
        fields = ['fecha_venta', 'monto_total',
                  'cliente', 'serie_documento',
                  'tipo_documento', 'vendedor', 'details', 'business']

    def create(self, validated_data: dict):
        # retrieve details
        details: list[OrderedDict] = list(validated_data.pop('details', []))
        business = validated_data.pop('business')

        total_sum = reduce(lambda prev, curr: prev + DetalleVenta.total_mont(curr, curr.get('cantidad')), details,
                           0)
        # save sale
        validated_data.update({
            'monto_total': total_sum
        })
        # save the relation with business

        sale: Venta = Venta.objects.create(**validated_data, business=business)
        # save details
        sale.save()

        for detail in details:
            detail_prepared = DetalleVenta.objects.create(**detail, venta=sale)
            detail_prepared.save()
        # update small box of the current day

        # emit  event to the front-end

        # return ok :)
        return sale
