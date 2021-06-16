from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from  rest_framework.status import HTTP_400_BAD_REQUEST
from  dashboard.serializers.Venta_serializer import  VentaSerializer

class SaleView(APIView):

    def post(self, request: Request, format=None):
        data = VentaSerializer(data=request.data)
        if data.is_valid() :
            data.save()
        else:
            return Response({'errors' : data.errors} , status=HTTP_400_BAD_REQUEST)

        return Response({'greeting': 'hello two'})
