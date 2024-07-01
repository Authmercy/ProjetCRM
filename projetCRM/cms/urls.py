from django.urls import path
from cms import *
from cms import views
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import *

from rest_framework import routers

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('campagne_marketingList/',views.ListCampagneMarketingView.as_view(), name='campagne_marketing'),
    path('add_campagne_marketing/',views.CreateCampagneMarketingView.as_view(), name='create_campagne_marketing'),
    path('<int:pk>/update_campagne_marketing/',views.UpdateCampagneMarketingView.as_view(), name='campagne_marketing_update'),
    path('<int:pk>/delete_campagne_marketing/',views.DeleteCampagneMarketingView.as_view(), name='campagne_marketing_delete'),  
    path('categoryList/',views.ListCategoryView.as_view(), name='category'),
    path('add_category/',views.CreateCategoryView.as_view(), name='create_category'),
    path('<int:pk>/update_category/',views.UpdateCategoryView.as_view(), name='category_update'),
    path('<int:pk>/delete_category/',views.DeleteCategoryView.as_view(), name='category_delete'),  
    path('clientList/',views.ListClientProspectView.as_view(), name='client'),
    path('add_client/',views.CreateClientProspectView.as_view(), name='create_client'),
    path('<int:pk>/update_client/',views.UpdateClientProspectView.as_view(), name='client_update'),
    path('<int:pk>/delete_client/',views.DeleteClientProspectView.as_view(), name='client_delete'),  
    path('commandeList/',views.ListCommandeView.as_view(), name='commande'),
    path('add_commande/',views.CreateCommandeView.as_view(), name='create_commande'),
    path('<int:pk>/update_commande/',views.UpdateCommandeView.as_view(), name='commande_update'),
    path('<int:pk>/delete_commande/',views.DeleteCommandeView.as_view(), name='commande_delete'),  
    path('gestionnaireList/',views.ListGestionnaireView.as_view(), name='gestionnaire'),
    path('add_gestionnaire/',views.CreateGestionnaireView.as_view(), name='create_gestionnaire'),
    path('<int:pk>/update_gestionnaire/',views.UpdateGestionnaireView.as_view(), name='gestionnaire_update'),
    path('<int:pk>/delete_gestionnaire/',views.DeleteGestionnaireView.as_view(), name='gestionnaire_delete'),  
    path('produitList/',views.ListProduitView.as_view(), name='produit'),
    path('add_produit/',views.CreateProduitView.as_view(), name='create_produit'),
    path('<int:pk>/update_produit/',views.UpdateProduitView.as_view(), name='produit_update'),
    path('<int:pk>/delete_produit/',views.DeleteProduitView.as_view(), name='produit_delete'),  
    path('serviceClientList/',views.ListServiceClientView.as_view(), name='serviceClient'),
    path('add_serviceClient/',views.CreateServiceClientView.as_view(), name='create_serviceClient'),
    path('<int:pk>/update_serviceClient/',views.UpdateServiceClientView.as_view(), name='serviceClient_update'),
    path('<int:pk>/delete_serviceClient/',views.DeleteServiceClientView.as_view(), name='serviceClient_delete'),  
    path('api/statut-choices/', views.StatutChoicesAPIView.as_view(), name='statut_choices'),
    path('api/choices/', views.StatutAPIView.as_view(), name='choices'),
    path('venteList/',views.ListVenteView.as_view(), name='vente'),
    path('add_vente/',views.CreateVenteView.as_view(), name='create_vente'),
    path('<int:pk>/update_vente/',views.UpdateVenteView.as_view(), name='vente_update'),
    path('<int:pk>/delete_vente/',views.DeleteVenteView.as_view(), name='vente_delete'), 
    path('commande/count/', CommandeCountView.as_view(), name='commande-count'),
    path('vente/count/', VenteCountView.as_view(), name='vente-count'),
    path('campagne/count/', CampagneCountView.as_view(), name='campagne-count'),
    path('service/count/', ServiceClientCountView.as_view(), name='commande-count'),
    path('produit/count/', ProduitCountView.as_view(), name='produit-count'),
     path('client/count/', ClientCountView.as_view(), name='client-count'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)