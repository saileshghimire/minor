from django import forms
from django.core import validators
from .models import *



class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
        

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = '__all__'

class CreateUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','email','password']


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"