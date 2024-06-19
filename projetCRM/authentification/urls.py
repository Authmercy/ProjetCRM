from django.urls import path
from authentification.views import *
from authentification import views
urlpatterns = [
    path('login',views.LoginView.as_view(), name='login'),   
   # path('logout',views.LogoutView.as_view(), name='logout'),  
    path('register',views.RegistrationView.as_view(), name='register'),      
    path('logout', LogoutView.as_view()),
]
