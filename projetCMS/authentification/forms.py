from django import forms

class LoginForm(forms.Form):
    # username = forms.CharField(label="nom utilisateur",widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label="E-mail",widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label = "mot de passe", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    
class RegisterForm(forms.Form):
    username = forms.CharField(label="nom utilisateur",widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label="E-mail",widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label = "mot de passe", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password_confirm = forms.CharField(label = "mot de passe de confirmation", widget=forms.PasswordInput(attrs={'class': 'form-control'}))