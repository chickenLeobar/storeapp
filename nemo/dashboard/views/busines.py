from ..models.Negocio import Negocio
from rest_framework.viewsets import ModelViewSet
from ..serializers.negocio_serializer import NegocioSerializer
from rest_framework.exceptions import PermissionDenied
from django.db.models import QuerySet


class BusinessViewSet(ModelViewSet):
    serializer_class = NegocioSerializer
    queryset = Negocio.objects.all()

    def filter_queryset(self, queryset: QuerySet):
        user = self.request.query_params.get('user_id')
        if user is not None:
            queryset = queryset.filter(user=user)
        else:
            raise PermissionDenied(detail="No tiene acceso para esta solicitar este recurso")
        return super().filter_queryset(queryset)
