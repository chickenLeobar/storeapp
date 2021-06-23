from rest_framework.viewsets import ModelViewSet
from  dashboard.serializers.contact_serializer import ContactSerializer
from  dashboard.models.contact import Contact

class ContactViewSet(ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

