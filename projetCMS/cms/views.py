from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import viewsets
from .serializers import *
from rest_framework.decorators import api_view
from .models import *
from rest_framework.response import Response


class adminView(viewsets.ModelViewSet):
 
    serializer_class = ServiceClientSerializer
 
 
    queryset = ServiceClient.objects.all()
    
class ListServiceClientView(ListAPIView):
    queryset= ServiceClient.objects.all()
    serializer_class= ServiceClientSerializer
    
class CreateServiceClientView(CreateAPIView):
    queryset= ServiceClient.objects.all()
    serializer_class= ServiceClientSerializer
    
class UpdateServiceClientView(UpdateAPIView): 
    queryset=ServiceClient.objects.all()
    serializer_class= ServiceClientSerializer

class DeleteServiceClientView(DestroyAPIView):
    queryset= ServiceClient.objects.all()
    serializer_class= ServiceClientSerializer



class adminView(viewsets.ModelViewSet):
 
    serializer_class = ProduitSerializer
 
 
    queryset = Produit.objects.all()
    
class ListProduitView(ListAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer
    
class CreateProduitView(CreateAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer
    
class UpdateProduitView(UpdateAPIView): 
    queryset=Produit.objects.all()
    serializer_class= ProduitSerializer

class DeleteProduitView(DestroyAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer


class adminView(viewsets.ModelViewSet):
    serializer_class = GestionnaireSerializer
    queryset = Gestionnaire.objects.all()
    
class ListGestionnaireView(ListAPIView):
    queryset= Gestionnaire.objects.all()
    serializer_class= GestionnaireSerializer
    
class CreateGestionnaireView(CreateAPIView):
    queryset= Gestionnaire.objects.all()
    serializer_class= GestionnaireSerializer
    
class UpdateGestionnaireView(UpdateAPIView):
    queryset=Gestionnaire.objects.all()
    serializer_class= GestionnaireSerializer

class DeleteGestionnaireView(DestroyAPIView):
    queryset= Gestionnaire.objects.all()
    serializer_class= GestionnaireSerializer
         
class adminView(viewsets.ModelViewSet):
    serializer_class = CommandeSerializer
    queryset = Commande.objects.all()
class ListCommandeView(ListAPIView):
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
    
class CreateCommandeView(CreateAPIView):
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
    
class UpdateCommandeView(UpdateAPIView): 
    queryset=Commande.objects.all()
    serializer_class= CommandeSerializer

class DeleteCommandeView(DestroyAPIView):
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
   
class adminView(viewsets.ModelViewSet):
 
    serializer_class = ClientSerializer
 
 
    queryset = ClientProspect.objects.all()
    
class ListClientProspectView(ListAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientSerializer
    
class CreateClientProspectView(CreateAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientSerializer
    
class UpdateClientProspectView(UpdateAPIView): 
    queryset=ClientProspect.objects.all()
    serializer_class= ClientSerializer

class DeleteClientProspectView(DestroyAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientSerializer

class adminView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
class ListCategoryView(ListAPIView):
    queryset= Category.objects.all()
    serializer_class= CategorySerializer
    
class CreateCategoryView(CreateAPIView):
    queryset= Category.objects.all()
    serializer_class= CategorySerializer
    
class UpdateCategoryView(UpdateAPIView): 
    queryset=Category.objects.all()
    serializer_class= CategorySerializer

class DeleteCategoryView(DestroyAPIView):
    queryset= Category.objects.all()
    serializer_class= CategorySerializer

class adminView(viewsets.ModelViewSet):

    serializer_class = CampagneMarketingSerializer

    queryset = CampagneMarketing.objects.all()
    
class ListCampagneMarketingView(ListAPIView):
    queryset= CampagneMarketing.objects.all()
    serializer_class= CampagneMarketingSerializer
    
class CreateCampagneMarketingView(CreateAPIView):
    queryset= CampagneMarketing.objects.all()
    serializer_class= CampagneMarketingSerializer
    
class UpdateCampagneMarketingView(UpdateAPIView): 
    queryset=CampagneMarketing.objects.all()
    serializer_class= CampagneMarketingSerializer

class DeleteCampagneMarketingView(DestroyAPIView):
    queryset= CampagneMarketing.objects.all()
    serializer_class= CampagneMarketingSerializer
