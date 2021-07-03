from ..models import SaleView

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from  ..db_views.sale_view import SaleView ,Saledbserializer


@api_view(['GET'])
def test_route(request: Request):

    data = Saledbserializer(SaleView.objects.all(),many=True)
    return Response({'hello' : data.data })
