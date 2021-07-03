from ..models import Venta

"""
 view
 - name client if this exist -> null
 - fecha_venta 
"""
from django.db import models
from view_table.models import ViewTable

from rest_framework import serializers

models.Model


class SaleView(ViewTable):
    id_venta = models.OneToOneField(Venta, primary_key=True, db_column="id_venta", on_delete=models.DO_NOTHING)
    fecha_venta = models.DateTimeField(null=True)
    monto_total = models.DecimalField(decimal_places=2, max_digits=9)
    client_name = models.CharField(max_length=250)
    itemscount = models.IntegerField()
    business = models.IntegerField()

    @classmethod
    def get_query(self):
        query = Venta.objects.raw("""
      select 
        -- id_venta
        ve.id as id_venta,  
        ve.fecha_venta as fecha_venta ,
        -- monto__total 
        ve.monto_total as monto_total ,
        -- client__name 
        co.name as client_name,
        -- vendedor 
        ven.name as vendedor,
        -- itemscount 
        count(detail) as itemscount, 
        -- business 
        deal.id  as business
        from public.dashboard_venta as ve 
        left outer join public.dashboard_contact as co on co.id =  ve.id 
        inner join public.dashboard_detalleventa as detail on detail.venta_id = ve.id
        left outer join public.dashboard_contact as ven on ven.id  = ve.vendedor_id
        inner JOIN  public.dashboard_negocio as deal on deal.id =  ve.business_id
        group by ve.id ,ve.id,  
        ve.fecha_venta,
        ve.monto_total,
        co.name,
        ven.name,
        deal.id
        """).query

        print(query)
        return str(query)


# serializer

class Saledbserializer(serializers.ModelSerializer):
    class Meta:
        model = SaleView
        fields = '__all__'
