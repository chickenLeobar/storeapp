from django.shortcuts import render

from django.views import View
# Create your views here.
from .forms.loguin import LoguinForm

from django.contrib.auth import authenticate
"""

About redirect :
https://realpython.com/django-redirects/#:~:text=Django%20Redirects%3A%20A%20Super%20Simple%20Example,-In%20Django%2C%20you&text=Just%20call%20redirect()%20with,then%20return%20from%20your%20view.&text=Assuming%20this%20is%20the%20main,to%20%2Fredirect%2Dsuccess%2F%20.
"""

from django.shortcuts import redirect


class HomePage(View):
    template_name = "website/index.html"

    def get(self, *args, **kwargs):

        return render(self.request, self.template_name)


class loguin(View):
    template_name = "auth/login.html"

    def get(self, *args, **kwargs):
        form = LoguinForm()
        context = {}
        context["form"] = form

        return render(self.request, self.template_name,  context)

    def post(self, *args, **kwargs):
        form = LoguinForm(self.request.POST or None)
        context = {}
        if form.is_valid:
            username = self.request.POST['username']
            password = self.request.POST['password']
            user = authenticate(username=username, password=password)
            context['error'] = "Usuario/contraseña invalido"
            context['form'] = form
            if(user is None):
                return render(self.request, self.template_name,  context)
            else:
                return redirect("/dashboard")
        else:
            context = {
                'form': form
            }
            return render(self.request,  self.template_name, context)


def register(request, *args, **kwargs):
    return render(request, "auth/register.html")
