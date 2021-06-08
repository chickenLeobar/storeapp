from django import urls
from django.conf.urls import url
from django.urls import path , include
from .views import index
from .views import ( user_rest)

from .views.product import ProductViewSet
from .views.busines import BusinessViewSet
from .views.product import (CategoryViewSet ,  BrandSerializer)
from rest_framework import routers

from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r"^users$" , user_rest.UserViewSet)
router.register(r"^groups" , user_rest.GroupViewSet)
router.register(r"^products" , ProductViewSet)
router.register(r"^negocio" , BusinessViewSet)
router.register(r"^category" , CategoryViewSet)
router.register(r"^brand" , BrandSerializer)

urlpatterns = [
    url(r'^$',  index, name="dashboard"),
    url(r'^' , include(router.urls)),
    url(r'^docs/' , include_docs_urls(title="Api", public=False))
]
