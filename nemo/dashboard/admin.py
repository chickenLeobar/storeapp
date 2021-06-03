from .models import (Product, Brand, Category, Compra,
                     DetalleCompra, Venta, DetalleVenta, Proveedor)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import creationUserForm, changueUserForm
# Register your models here.

from .models import Usuario


class UserAdmin(BaseUserAdmin):
    add_form = creationUserForm
    form = changueUserForm

    list_display = ('email', 'nombres', 'is_staff')
    list_filter = ('is_admin',)
    fieldsets = ((None, {'fields': ('apellidos', 'nombres')}),)

    search_fields = ('email',),
    ordering = ('email',)


admin.site.register(Usuario, UserAdmin)


admin.site.register(Product)
admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(Compra)
admin.site.register(DetalleCompra)
admin.site.register(Proveedor)
