
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

from  .views.user_rest import  validateUser, generate_new_code , authenticate_user , get_user

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
    re_path(r'^$', index, name="dashboard"),
    re_path(r'^', include(router.urls)),
    re_path(r'^docs/', include_docs_urls(title="Api", public=False)),
    re_path(r'^cloudinary$', Cloudinary.as_view(), name="sign_url"),
    re_path(r'^cloudinary/(?P<id>[\w]+)/$', Cloudinary.as_view(), name="delete_resource"),
    re_path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path('auth/verifycode' , validateUser , name="code_user"),
    re_path('auth/newcode' , generate_new_code , name="code_user"),
    re_path('auth/login' , authenticate_user , name ="Loguin"),
    re_path('auth/register' , user_rest.CreateUserViewSet.as_view() , name="create_user"),
    re_path(r'^auth/user/(?P<id>\d+)/$', get_user, name="get_user")
]
