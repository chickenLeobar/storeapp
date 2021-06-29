from django.contrib.auth import models
from django.contrib.auth.models import  Group
from django.db.models import fields
from rest_framework import serializers
from ..models import Usuario

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password' : {
                'write_only' : True
            }
        }


class GroupSerialize(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["url" , "name"]

