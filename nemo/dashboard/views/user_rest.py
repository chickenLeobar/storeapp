from django.contrib.auth.models import  Group
from django.db.models import manager
from django.views.generic import detail
from rest_framework import viewsets , permissions
from ..models import Usuario
from ..managers import CustomUserManger
from ..serializers import auth_serialize


class UserViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = auth_serialize.UserSerializer
    lookup_field = "email"
    

# define viewset for each serializer

class  GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = auth_serialize.GroupSerialize
