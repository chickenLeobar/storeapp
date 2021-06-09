

from django.db.models.query import QuerySet
from rest_framework import serializers

from ..models import (Brand, Category)

from django.urls import reverse_lazy

from ..models import Product
from rest_framework.decorators import action

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from ..serializers.product_serializer import (
    ProductSerializer, CategorySerializer, BrandSerializer)


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "name"
    queryset = Product.objects.all()


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def filter_queryset(self, queryset: QuerySet):
        keyword = self.request.query_params.get("keyword")
        if(keyword != None or keyword == ''):
            queryset = queryset.filter(name__icontains=keyword)
        return super().filter_queryset(queryset)


class BrandSerializer(ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()

    def filter_queryset(self, queryset: QuerySet):
        keyword = self.request.query_params.get("keyword")
        if(keyword != None or keyword == ''):
            queryset = queryset.filter(name__icontains=keyword)
        return super().filter_queryset(queryset)
