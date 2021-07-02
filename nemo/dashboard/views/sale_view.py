from dashboard.models import Venta
from dashboard.serializers.Venta_serializer import VentaSerializer
from rest_framework.viewsets import ModelViewSet
from dashboard.utils.common_filters import CommonFilterBusinessMixin


class SaleViewSet(CommonFilterBusinessMixin,ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
