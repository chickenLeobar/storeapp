from django.conf.urls import url
from django.urls import path
from .views import index
from .views import ProductsView, CreateBrand, CreateCategory
urlpatterns = [
    url(r'^$',  index, name="dashboard"),
    path('product/', ProductsView.as_view(), name="productpage"),
    path("createbrand/" , CreateBrand.as_view() , name="createbrand"),
    path("createcategory" ,CreateCategory.as_view() , name="createcategory"),
    
]
