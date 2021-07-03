from dashboard.models import Venta
from dashboard.serializers.Venta_serializer import VentaSerializer
from rest_framework.viewsets import ModelViewSet
from dashboard.utils.common_filters import CommonFilterBusinessMixin
from ..db_views.sale_view import SaleView, Saledbserializer
from rest_framework.response import Response


class SaleViewSet(CommonFilterBusinessMixin, ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = SaleView.objects.all()
        business = self.request.query_params.get('business')
        if business is not None:
            queryset = queryset.filter(business=business)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = Saledbserializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = Saledbserializer(queryset, many=True)
        return Response(serializer.data)
