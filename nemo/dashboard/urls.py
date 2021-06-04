from django import urls
from django.conf.urls import url
from django.urls import path , include
from .views import index
from .views import ( user_rest)

from .views.product import ProductViewSet
from rest_framework import routers


router = routers.DefaultRouter()

router.register(r"^users" , user_rest.UserViewSet)
router.register(r"^groups" , user_rest.GroupViewSet)

router.register(r"^products" , ProductViewSet)
 
urlpatterns = [
    url(r'^$',  index, name="dashboard"),
    # path('product/', ProductsView.as_view(), name="productpage"),
    # path("createbrand/" , CreateBrand.as_view() , name="createbrand"),
    # path("createcategory" ,CreateCategory.as_view() , name="createcategory"),
    url(r'^' , include(router.urls))
]
