from django import forms

"""
User authentication
https://docs.djangoproject.com/en/3.2/topics/auth/default/#user-objects

"""
common_errors = {
    "required": "Este campo es requerido"
}


class LoguinForm(forms.Form):
    username = forms.CharField(
        max_length=50, help_text="", label="Usuario", error_messages=common_errors)
    password = forms.CharField(
        max_length=120, widget=forms.PasswordInput, label="Contraseña", required=True, error_messages=common_errors)
