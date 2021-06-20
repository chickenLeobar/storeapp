
from django.conf.urls import url
from django.urls import include
from .views import index
from .views import (user_rest)

from .views.product import ProductViewSet
from .views.busines import BusinessViewSet
from .views.product import (CategoryViewSet, BrandViewSet)

from .views.sale_view import SaleViewSet

from rest_framework import routers

from rest_framework.documentation import include_docs_urls


from .api.cloudinary import Cloudinary

router = routers.DefaultRouter()

router.register(r"^users$", user_rest.UserViewSet)
router.register(r"^groups", user_rest.GroupViewSet)
router.register(r"^products", ProductViewSet)
router.register(r"^negocio", BusinessViewSet)
router.register(r"^category", CategoryViewSet)
router.register(r"^brand", BrandViewSet)
router.register(r'^sale', SaleViewSet)

urlpatterns = [
    url(r'^$', index, name="dashboard"),
    url(r'^', include(router.urls)),
    url(r'^docs/', include_docs_urls(title="Api", public=False)),
    url(r'^cloudinary$', Cloudinary.as_view(), name="sign_url"),
    url(r'^cloudinary/(?P<id>[\w]+)/$', Cloudinary.as_view(), name="delete_resource"),
]
