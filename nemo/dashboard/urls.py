
from django.conf.urls import url , re_path
from django.urls import include
from .views import index
from .views import (user_rest)

from .views.product import ProductViewSet
from .views.busines import BusinessViewSet
from .views.product import (CategoryViewSet, BrandViewSet)


from .views.sale_view import SaleViewSet

from rest_framework import routers

from rest_framework.documentation import include_docs_urls

from dashboard.views.contact import   ContactViewSet

from  .views.user_rest import  validateUser, generate_new_code

from .api.cloudinary import Cloudinary

from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView
)

router = routers.DefaultRouter()


router.register(r"^products", ProductViewSet)

router.register(r"^negocio", BusinessViewSet)
router.register(r"^category", CategoryViewSet)
router.register(r"^brand", BrandViewSet)
router.register(r'^sale', SaleViewSet)
router.register(r'^contact',ContactViewSet)

urlpatterns = [
    url(r'^$', index, name="dashboard"),
    url(r'^', include(router.urls)),
    url(r'^docs/', include_docs_urls(title="Api", public=False)),
    url(r'^cloudinary$', Cloudinary.as_view(), name="sign_url"),
    url(r'^register' , user_rest.CreateUserViewSet.as_view() , name="create_user"),
    url(r'^cloudinary/(?P<id>[\w]+)/$', Cloudinary.as_view(), name="delete_resource"),
    re_path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path('auth/verifycode' , validateUser , name="code_user"),
    re_path('auth/regeneratecode' , generate_new_code , name="code_user")
]
