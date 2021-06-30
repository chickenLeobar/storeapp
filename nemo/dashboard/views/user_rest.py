from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework import viewsets, permissions

from django.core.cache import cache

from ..serializers import auth_serialize
from rest_framework.generics import CreateAPIView

from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Usuario

from rest_framework.decorators import api_view

from rest_framework.request import Request
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from django.core.mail import send_mail
from django.contrib.auth import authenticate
from  django.shortcuts import  get_object_or_404
import random


def generate_code():
    code_in_array = random.sample(range(0, 9), 5)
    code = "".join(str(d) for d in code_in_array)
    exist_in_cache = cache.get(code)
    if exist_in_cache:
        code = generate_code()
    return code


def get_token(data: Usuario):
    source = RefreshToken.for_user(data)
    return str(source.access_token)


class CodeResolver:
    @staticmethod
    def save_code_and_send_email(email: str):
        code = generate_code()
        cache.set("code:{}".format(code), email, timeout=60 * 60 * 7)  # code valid just 7 h
        # send email
        try:
            send_mail(subject='Codigo de confirmación',
                      message=f'Hola bienvenido a ROESBA, tu codigo de confirmación es {code}',
                      from_email="leonardito3458@gmail.com", recipient_list=[email], fail_silently=False)
        except:
            exception = ValidationError(detail="Problem when send intend send email")
            exception.status_code = HTTP_500_INTERNAL_SERVER_ERROR
            raise exception

    @staticmethod
    def verify_code(code: str, email: str):
        cache_email = cache.get("code:{}".format(code))
        return cache_email and email == cache_email


class CreateUserViewSet(CreateAPIView):
    serializer_class = auth_serialize.UserSerializer
    queryset = Usuario.objects.all()
    lookup_field = "email"

    def create(self, request, *args, **kwargs):
        serializer: auth_serialize.UserSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_saved = serializer.save()
        token = get_token(user_saved)
        # generate code for user
        CodeResolver.save_code_and_send_email(user_saved.email)
        return Response(data={
            'user': serializer.data,
            'token': token
        })


@api_view(['POST'])
def validateUser(request: Request):
    email = request.data['email']
    code = request.data['code']
    code_is_valid = CodeResolver.verify_code(code, email)
    if code_is_valid:
        user = Usuario.objects.filter(email=email).first()
        if user:
            user.validated = True
            token = get_token(user)
            serializer = auth_serialize.UserSerializer(instance=user)
            user.save()
            return Response(data={
                'token': token,
                'user': serializer.data
            })
        raise ValidationError(detail="Code expired")
    raise ValidationError(detail="Code expired")


# refresh code

@api_view(['POST'])
def generate_new_code(request: Request):
    email = request.data['email']
    exist_user = Usuario.objects.exist_user(email)
    if exist_user:
        CodeResolver.save_code_and_send_email(email)
        return Response(data={
            'token': get_token(exist_user)
        }, status=200)
    raise ValidationError(detail="email not exist")


@api_view(['POST'])
def authenticate_user(request: Request):
    email = request.data['email']
    password = request.data['password']
    raw_user = authenticate(username=email, password=password)
    user_serializer = auth_serialize.UserSerializer(instance=raw_user)
    if raw_user:
        return Response({
             'user' : user_serializer.data,
            'token': get_token(raw_user),
        }, status=200)

    raise PermissionDenied()


@api_view(['get'])
def get_user(request: Request, *args, **kwargs):
    id = kwargs.pop('id')
    user = get_object_or_404(Usuario , pk = id)
    user_serializer = auth_serialize.UserSerializer(instance=user)
    return Response({
            'user': user_serializer.data
    })

