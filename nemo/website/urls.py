

from django.conf.urls import url
from .views import HomePage, loguin, register
urlpatterns = [
    url(r"^$", HomePage.as_view(), name="home"),
    url(r"^loguin/", loguin.as_view(), name="loguin"),
    url(r"^register/", register, name="register"),
]
