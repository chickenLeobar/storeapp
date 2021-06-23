from  rest_framework import  serializers
from dashboard.models.contact import Contact

class ContactSerializer(serializers.ModelSerializer):
        class Meta:
            model = Contact
            fields = '__all__'
