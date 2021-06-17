from django.contrib.auth import models
from django.contrib.auth.models import  Group
from django.db.models import fields
from rest_framework import serializers
from ..models import Usuario

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = [ "email" , "nombres" ,  "password" ,"groups" , "apellidos"]
        extra_kwargs = {
            'password' : {
                'write_only' : True
            }
        }

class GroupSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url" , "name"]

