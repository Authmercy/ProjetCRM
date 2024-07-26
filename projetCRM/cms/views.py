from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.http.response import JsonResponse,HttpResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import viewsets
from .serializers import *
from rest_framework.decorators import api_view
from .models import *
from .models import *
from rest_framework.response import Response
from django.views import View
from xhtml2pdf import pisa
from django.template.loader import render_to_string 
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags





 
    
@api_view(['POST'])
def send_email(request):
    serializer = EmailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(request.data)
        return Response({'status': 'Email sent successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


class StatutChoicesAPIView(generics.ListAPIView):
    serializer_class = None 
    
    def get(self, request, *args, **kwargs):
        return Response({'choices': statut})
    


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
    def generate_pdf(request):
        commande_id = request.GET.get('id')
        if not commande_id:
            return HttpResponse("Erreur", status=400)
        try:
            commande = Commande.objects.get(pk=commande_id)
        except Commande.DoesNotExist:
            return HttpResponse("Auncun Commande trouvé", status=404)
        context = {
            'commande': commande,
        }
        html_string = render_to_string('pdf_commande.html', context)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="commande_{commande_id}.pdf"'
        pisa_status = pisa.CreatePDF(html_string, dest=response)
        if pisa_status.err:
            return HttpResponse('Erreur <pre>' + html_string + '</pre>')
        return response

@api_view(['GET'])
def search_products(request):
    query = request.GET.get('name', '')
    if query:
        products = Produit.objects.filter(nomProduit__icontains=query)
    else:
        products = Produit.objects.all()
    serializer = ProduitSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_commande(request):
        query = request.GET.get('name', '')
        if query:
            products = Commande.objects.filter(id__icontains=query)
        else:
            products =  Commande.objects.all()
        serializer =  Commande(products, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def search_campagne(request):
        query = request.GET.get('name', '')
        if query:
            products = CampagneMarketing.objects.filter(nomCampagne__icontains=query)
        else:
            products =  CampagneMarketing.objects.all()
        serializer =  CampagneMarketing(products, many=True)
        return Response(serializer.data)
        
class CreateCommandeView(CreateAPIView):
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
    
class UpdateCommandeView(UpdateAPIView): 
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
class DeleteCommandeView(DestroyAPIView):
    queryset= Commande.objects.all()
    serializer_class= CommandeSerializer
   
class adminView(viewsets.ModelViewSet):
 
    serializer_class = ClientSerializer
 
 
    queryset = ClientProspect.objects.all()
    
class ListClientProspectView(ListAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientProspectSerializer
    
@api_view(['GET'])
def client_detail(request, pk):
    try:
        client = ClientProspect.objects.get(pk=pk)
    except ClientProspect.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ClientSerializer(client)
    return Response(serializer.data)
    
@api_view(['GET'])
def search_pclient(request):
        query = request.GET.get('name', '')
        if query:
            products = ClientProspect.objects.filter(nom__icontains=query)
        else:
            products = ClientProspect.objects.all()
        serializer = ClientProspectSerializer(products, many=True)
        return Response(serializer.data)
class CreateClientProspectView(CreateAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientProspectSerializer
    
class UpdateClientProspectView(UpdateAPIView): 
    queryset=ClientProspect.objects.all()
    serializer_class= ClientProspectSerializer

class DeleteClientProspectView(DestroyAPIView):
    queryset= ClientProspect.objects.all()
    serializer_class= ClientProspectSerializer
    
  
class ListClientView(ListAPIView):
    queryset= Client.objects.all()
    serializer_class= ClientSerializer
@api_view(['GET'])
def search_client(request):
        query = request.GET.get('name', '')
        if query:
            products = Client.objects.filter(nom__icontains=query)
        else:
            products = Client.objects.all()
        serializer = ClientSerializer(products, many=True)
        return Response(serializer.data)
    
class CreateClientView(CreateAPIView):
    queryset= Client.objects.all()
    serializer_class= ClientSerializer
    
class UpdateClientView(UpdateAPIView): 
    queryset=Client.objects.all()
    serializer_class= ClientSerializer

class DeleteClientView(DestroyAPIView):
    queryset= Client.objects.all()
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
@api_view(['GET'])
def search_category(request):
        query = request.GET.get('name', '')
        if query:
            products =  Category.objects.filter(nomCategory__icontains=query)
        else:
            products =  Category.objects.all()
        serializer =  Category(products, many=True)
        return Response(serializer.data)
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
    
class ListVenteView(ListAPIView):
    queryset= Vente.objects.all()
    serializer_class= VenteSerializer

    
    def generate_pdf(request):
        vente_id = request.GET.get('id')
        if not vente_id:
            return HttpResponse("Erreur", status=400)
        try:
            vente = Vente.objects.get(pk=vente_id)
        except Vente.DoesNotExist:
            return HttpResponse("Auncun Vente trouvé", status=404)
        context = {
            'vente': vente,
        }
        html_string = render_to_string('pdf_ventes.html', context)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="vente_{vente_id}.pdf"'
        pisa_status = pisa.CreatePDF(html_string, dest=response)
        if pisa_status.err:
            return HttpResponse('Erreur <pre>' + html_string + '</pre>')
        return response


       
    
@api_view(['GET'])
def search_vente(request):
        query = request.GET.get('name', '')
        if query:
            products = Vente.objects.filter(__icontains=query)
        else:
            products = Vente.objects.all()
        serializer = Vente(products, many=True)
        return Response(serializer.data)    
    
class CreateVenteView(CreateAPIView):
    queryset= Vente.objects.all()
    serializer_class= VenteSerializer
    
class UpdateVenteView(UpdateAPIView): 
    queryset=Vente.objects.all()
    serializer_class= VenteSerializer

class DeleteVenteView(DestroyAPIView):
    queryset= Vente.objects.all()
    serializer_class= VenteSerializer
    
class CommandeCountView(View):
    def get(self, request, *args, **kwargs):
        total_commandes = Commande.objects.count()
        return JsonResponse({'total_commandes': total_commandes})
    
class VenteCountView(View):
    def get(self, request, *args, **kwargs):
        total_Ventes = Vente.objects.count()
        return JsonResponse({'total_Ventes': total_Ventes}) 
class ProduitCountView(View):
    def get(self, request, *args, **kwargs):
        total_Produits = Produit.objects.count()
        return JsonResponse({'total_Produits': total_Produits})     
class CampagneCountView(View):
    def get(self, request, *args, **kwargs):
        total_Campagnes = CampagneMarketing.objects.count()
        return JsonResponse({'total_Campagnes': total_Campagnes})        
class ServiceClientCountView(View):
    def get(self, request, *args, **kwargs):
        total_ServiceClient = ServiceClient.objects.count()
        return JsonResponse({'total_ServiceClient': total_ServiceClient})       
class ClientCountView(View):
    def get(self, request, *args, **kwargs):
        total_Client = Client.objects.count()
        return JsonResponse({'total_Client': total_Client})   
      
