from django.db.models import fields
from ..models import (Product, Category , Brand)


from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model =  Category
        fields ="__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Brand
        fields ="__all__"
        