from base64 import urlsafe_b64encode
from django.conf import settings
from .models import *
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, get_user_model, logout
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import api_view
from .serializers import RegistrationSerializer, LoginSerializer, PasswordResetSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User, update_last_login
from rest_framework.authtoken.models import Token
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
import jwt, datetime

# Create your views here.

UserModel = get_user_model()
class RegistrationView(APIView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')
        password_confirm = request.data.get('password_confirm')
        if not email or not password or not username or not password_confirm:
            return Response({'error': 'Veuillez fournir les informations nécessaires pour l\'enregistrement'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create_user( username, email, password)
            user.save()
            return Response({'success': 'Utilisateur enregistré avec succès'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
       permission_classes = (AllowAny,)
       serializer_class = LoginSerializer
       def post(self, request, *args, **kwargs):
            serializer = LoginSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
          
            payload = {
            'id':  user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            response = Response()
            response.set_cookie(key='jwt', value=token, httponly=True)
            response.data = {
                'jwt': token
            }
            return Response({
                'success': 'Utilisateur connecté avec succès',
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)  




class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
