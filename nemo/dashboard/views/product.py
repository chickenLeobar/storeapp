

from rest_framework import serializers

from ..models import (Brand , Category)

from django.urls import reverse_lazy

from ..models import Product
from rest_framework.decorators import  action

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from ..serializers.product_serializer import (ProductSerializer , CategorySerializer , BrandSerializer)


class ProductViewSet(ModelViewSet):
    serializer_class =  ProductSerializer
    lookup_field = "name"
    queryset = Product.objects.all()

    @action(detail=False)
    def search_products(self , request):
        products  = Product.objects.all()

        
        serialize: ProductSerializer = self.get_serializer(products , many=True)
        return Response(serialize.data)
        



class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset =  Category.objects.all()


class BrandSerializer(ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()

