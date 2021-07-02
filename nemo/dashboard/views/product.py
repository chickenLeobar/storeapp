from django.db.models.query import QuerySet

from ..models import (Brand, Category)

from ..models import Product

from rest_framework.viewsets import ModelViewSet

from ..serializers.product_serializer import (
    ProductSerializer, CategorySerializer, BrandSerializer)

from dashboard.utils.common_filters import CommonFilterBusinessMixin


class ProductViewSet(CommonFilterBusinessMixin,ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "id"
    queryset = Product.objects.all()


class CategoryViewSet(CommonFilterBusinessMixin,ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class BrandViewSet(CommonFilterBusinessMixin,ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
