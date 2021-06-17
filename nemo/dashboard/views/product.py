

from django.db.models.query import QuerySet

from ..models import (Brand, Category)

from ..models import Product

from rest_framework.viewsets import ModelViewSet


from ..serializers.product_serializer import (
    ProductSerializer, CategorySerializer, BrandSerializer)




class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "id"
    queryset = Product.objects.all()


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def filter_queryset(self, queryset: QuerySet):
        keyword = self.request.query_params.get("keyword")
        if(keyword != None or keyword == ''):
            queryset = queryset.filter(name__icontains=keyword)
        return super().filter_queryset(queryset)


class BrandViewSet(ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
    def filter_queryset(self, queryset: QuerySet):
        keyword = self.request.query_params.get("keyword")
        if(keyword != None or keyword == ''):
            queryset = queryset.filter(name__icontains=keyword)
        return super().filter_queryset(queryset)
