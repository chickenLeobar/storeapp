from django.contrib.auth import models
from django.contrib.auth.models import Group
from django.db.models import fields
from rest_framework import serializers
from ..models import Usuario
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('apellidos' , 'nombres' ,'ciudad' ,'celular' ,'email' , 'data_joined' ,'password' , 'validated')
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            # 'validated' : {
            #     'read_only' : True
            # }
        }

    def create(self, validated_data: dict):
        password = validated_data.pop('password')
        #  hash passsword
        validated_data.update({
            'password': make_password(password)
        })
        user: Usuario = Usuario.objects.create(**validated_data)
        user.save()
        print("save one")
        return user


class GroupSerialize(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
