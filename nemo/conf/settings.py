"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

# https://pypi.org/project/python-environ/

from os import path
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ENVIROMENT
import environ

env = environ.Env()
root_path = environ.Path(__file__) - 2

env.read_env(env_file=root_path(".env"))

ENV = env("ENV", default="prod")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-on=haw5$y1bez=n0&bj*$rs!ck_ndx1sgk_ft$_-=2fzi7*2xm"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["194.62.99.14", "127.0.0.1", "app.wellnespro.com", "localhost"]

CRISPY_TEMPLATE_PACK = "bootstrap4"
# Application definition


REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # out
    "widget_tweaks",
    "crispy_forms",
    "bootstrap_modal_forms",
    # Third party
    "webpack_loader",
    "rest_framework",
    # apps
    "website",
    "dashboard",
]

AUTH_USER_MODEL = "dashboard.Usuario"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "conf.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR.joinpath("templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "conf.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
# postgres://postgres:6ca909936f57e880872040191405f2ab@dokku-postgres-djangoappbd:5432/djangoappbd
# dev =  postgres://postgres:alfk3458@postgres:5432/django_project
DATABASE = (
    {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "django_project",
        "USER": "postgres",
        "PASSWORD": "alfk3458",
        "HOST": "localhost",
        "PORT": "5432",
    }
    if ENV == "dev"
    else {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "djangoappbd",
        "USER": "postgres",
        "PASSWORD": "6ca909936f57e880872040191405f2ab",
        "HOST": "172.17.0.3",
        "PORT": "5432",
    }
)


DATABASES = {"default": DATABASE}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# -----------------------------------------------------------------------------
# Static & Media Files
# -----------------------------------------------------------------------------
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR.joinpath("static")


MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR.joinpath("media")

ADMIN_MEDIA_PREFIX = STATIC_URL + "admin/"


STATICFILES_DIRS = (
    ("bundles", BASE_DIR.joinpath("assets/bundles")),
    ("media", BASE_DIR.joinpath("media")),
    ("libs", BASE_DIR.joinpath("assets/lib")),
)

webpack_stats_filename = "webpack-bundle.%s.json" % ENV
stats_file = os.path.join(BASE_DIR.joinpath("assets/bundles/"), webpack_stats_filename)

REST_FRAMEWORK = { 'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema' }


WEBPACK_LOADER = {
    "DEFAULT": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "bundles/",  # must end with slash
        "STATS_FILE": stats_file,
        "POLL_INTERVAL": 0.1,
        "TIMEOUT": None,
        "IGNORE": [r".+\.hot-update.js", r".+\.map"],
    }
}

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
