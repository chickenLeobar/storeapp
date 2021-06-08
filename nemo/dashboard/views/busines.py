from..models.Negocio import Negocio
from rest_framework.viewsets import ModelViewSet
from ..serializers.negocio_serializer import NegocioSerializer

class BusinessViewSet(ModelViewSet):
     serializer_class = NegocioSerializer
     queryset = Negocio.objects.all()