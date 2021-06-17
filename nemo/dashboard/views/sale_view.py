from dashboard.models import Venta
from dashboard.serializers.Venta_serializer import VentaSerializer
from rest_framework.viewsets import ModelViewSet


class SaleViewSet(ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
