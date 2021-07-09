from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from dashboard.models.venta import Venta, DetalleVenta, Abono_venta, Type_payment
from dashboard.models import DetalleVenta
from functools import reduce
from typing import OrderedDict, Any
from django.db import transaction
from rest_framework.exceptions import APIException, ValidationError


class TypePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type_payment
        fields = "__all__"
        validators = [
           UniqueTogetherValidator( queryset=Type_payment.objects.all() ,
                                    fields= ['name' ,'business'] ,message="Ya existe un metodo de pago con este nombre")
        ]


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['venta', 'producto', 'cantidad']


class AbonoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abono_venta
        fields = ['mont', 'description', 'venta', 'type_payment']


class VentaSerializer(serializers.ModelSerializer):
    details = DetailSerializer(many=True, required=False)
    abonos = AbonoVentaSerializer(many=True, required=False)

    class Meta:
        model = Venta
        fields = ['id', 'fecha_venta', 'monto_total',
                  'cliente', 'serie_documento',
                  'tipo_documento', 'vendedor', 'details', 'business', 'abonos', 'meta']

    @transaction.atomic()
    def create(self, validated_data: dict):
        # retrieve details
        validated_data, details, abonos = self.prepare_relations(validated_data)
        # save the relation with business
        sale: Venta = Venta.objects.create(**validated_data)
        # save details
        sale.save()
        self.save_relations(details, abonos, sale)
        # update small box of the current day
        # emit  event to the front-end
        # return ok :)
        return sale

    def prepare_relations(self, validated_data):
        details: list[OrderedDict] = list(validated_data.pop('details', []))
        business = validated_data.pop('business')
        abonos: list[OrderedDict] = list(validated_data.pop('abonos', []))
        # sums details
        total_sum = reduce(lambda prev, curr: prev + DetalleVenta.total_mont(curr, curr.get('cantidad')), details, 0)
        # abonos sum
        total_sum_abonos = reduce(lambda prev, curr: prev + curr.get('mont'), abonos, 0)
        # save sale
        if total_sum_abonos > total_sum:
            raise ValidationError(detail={
                'custom_error': f"El monto de los abonos :  {total_sum_abonos} excede el monto total : {total_sum}"
            })
        validated_data.update({
            'monto_total': total_sum,
            'state_payment': total_sum_abonos == total_sum,
            'business': business,
            'meta': {
                'debt': str((total_sum - total_sum_abonos))
            }
        })
        return validated_data, details, abonos

    def save_relations(self, details, abonos, sale):
        for detail in details:
            detail_prepared = DetalleVenta.objects.create(**detail, venta=sale)
            detail_prepared.save()

        for abono in abonos:
            abono_prepared = Abono_venta.objects.create(**abono, venta=sale)
            abono_prepared.save()

    @transaction.atomic()
    def update(self, instance, validated_data: OrderedDict):
        # delete details
        Abono_venta.objects.filter(venta=instance).delete()
        DetalleVenta.objects.filter(venta=instance).delete()
        # sums details
        validated_data, details, abonos = self.prepare_relations(validated_data)
        sale_update = super().update(instance=instance, validated_data=validated_data)
        self.save_relations(details, abonos, sale=instance)
        return sale_update
