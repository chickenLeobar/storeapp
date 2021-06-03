from django.contrib.auth.forms import (UserCreationForm, UserChangeForm)
from ..models import Usuario


class creationUserForm(UserCreationForm):

    class Meta:
        model = Usuario
        fields = ('email',)


class changueUserForm(UserChangeForm):

    class Meta:
        model = Usuario
        fields = ('email',)

