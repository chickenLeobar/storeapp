from django.db.models import fields
from ..models import (Product, Category, Brand)
from django.core.exceptions import NON_FIELD_ERRORS
from ..models.venta import Type_payment
from rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"
