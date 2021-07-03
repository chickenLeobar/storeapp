from django.contrib.auth import models
from django.contrib.auth.models import Group
from django.db.models import fields
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from ..models import Usuario
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[], required=True, allow_blank=False)

    class Meta:
        model = Usuario
        fields = ('apellidos', 'nombres', 'ciudad', 'celular', 'email', 'data_joined', 'password', 'validated' ,'id')
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            # 'validated' : {
            #     'read_only' : True
            # }
        }

    def validate(self, data):
        user = Usuario.objects.exist_user(data['email'])
        if user is not None:
            raise ValidationError(detail="Este email ya se encuentra registrado, inicie sesión")
        return data

    def create(self, validated_data: dict):
        password = validated_data.pop('password')
        #  hash passsword
        validated_data.update({
            'password': make_password(password)
        })
        print("create user")
        user: Usuario = Usuario.objects.create(**validated_data)
        user.save()
        print("save one")
        return user


class GroupSerialize(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
