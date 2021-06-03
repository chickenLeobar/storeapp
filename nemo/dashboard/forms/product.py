from ..models import Category
from django.forms import ModelForm, fields, widgets
from django.forms.models import BaseModelForm, model_to_dict
from ..models import Product
from django.forms.widgets import NumberInput
from bootstrap_modal_forms.forms import BSModalModelForm
from ..models import Brand
import django.forms as forms
class ProductForm(ModelForm):
    
    class Meta:
        model = Product
        fields = ['name', 'price', 'description',
                  'cantidad', 'unity', 'category', 'brand']
        widgets = {
            'cantidad': NumberInput(attrs={'min': 0}),
            'price': NumberInput(attrs={'min': 0})
        }
    
    
class CreateBrandForm(BSModalModelForm):
    class Meta:
        model = Brand
        exclude = []
        
        
        
class CreateCategoryForm(BSModalModelForm):
       class Meta:
           model = Category
           exclude = []
    
    
            
        
        
        
        
        

