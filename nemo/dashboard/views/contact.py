from rest_framework.viewsets import ModelViewSet
from dashboard.serializers.contact_serializer import ContactSerializer
from dashboard.models.contact import Contact

from dashboard.utils.common_filters import CommonFilterBusinessMixin


class ContactViewSet(CommonFilterBusinessMixin,ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
