from ..forms import product

from bootstrap_modal_forms.generic import BSModalCreateView
from django.shortcuts import render
from ..models import Brand
from django.views import View
from ..forms import ProductForm, CreateBrandForm, CreateCategoryForm
from django.urls import reverse_lazy
from ..models import Product
from django.contrib import messages


class ProductsView(View):
    template_name = "dashboard/pages/product.html"
    products = Product.objects
    """
    TODO:
    - [] Prouduct -> business
    - [] 
    """

    def get(self, *args, **kwargs):
        form = ProductForm()
        context = {}
        context["form"] = form
        context["products"] = self.products.all()
        return render(self.request, self.template_name, context)

    def post(self, *args, **kwargs):
        form = ProductForm(self.request.POST)
        context = {}
        if form.is_valid:
            context = {"isValid": True}
            form_save = form.save()
            context["form"] = ProductForm()
            context["product"] = form_save
            context["products"] = self.products.all()
            messages.add_message(
                self.request, messages.SUCCESS, "Producto correctamente creado"
            )
            return render(self.request, self.template_name, context)
        else:
            context = {
                "isValid": False,
                "form": form,
            }
            context["products"] = self.products.all()
            print(form.errors)
            return render(self.request, self.template_name, context)


class CreateBrand(BSModalCreateView):
    template_name = "cruds/createBrand.html"
    form_class = CreateBrandForm
    success_message = "Marca correctamente Creada"
    success_url = reverse_lazy("productpage")


class CreateCategory(BSModalCreateView):
    template_name = "cruds/create_category.html"
    form_class = CreateCategoryForm
    success_message = "Categoria Creada"
    success_url = reverse_lazy("productpage")
