from rest_framework import serializers
from .models import *
from .models import CampagneMarketing




class ClientSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = ClientProspect
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        clientProspect = Client.objects.create(**validated_data)

        return clientProspect
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
class GestionnaireSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Gestionnaire
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        gestionnaire = Gestionnaire.objects.create(**validated_data)

        return gestionnaire
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance         
class CategorySerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Category
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        campagneMarketing = Category.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance    
    
    

class CampagneMarketingSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = CampagneMarketing
        fields = '__all__' 
        read_only_fields = ["id"]
        
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)
    
    def validate(self, data):
        date_debut = data.get('date_debut')
        date_fin = data.get('date_fin')
        if date_fin and date_fin < date_debut:
            raise serializers.ValidationError('La date de fin ne peut pas être antérieure à la date de début.')

        return data
    def create(self, validated_data):
        
        campagneMarketing = CampagneMarketing.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance    
        
   

        

        
        
class ClientProspectSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = ClientProspect
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        clientProspect = ClientProspect.objects.create(**validated_data)

        return clientProspect
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance 

        return instance    
                    
class ProduitSerializer(serializers.ModelSerializer):
    # create a meta class
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)


    class Meta:
        model = Produit
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        produit = Produit.objects.create(**validated_data)

        return produit
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance
    
class ServiceClientSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)
    gestionnaire = GestionnaireSerializer(read_only=True)
    gestionnaire_id = serializers.PrimaryKeyRelatedField(queryset=Gestionnaire.objects.all(), source='gestionnaire', write_only=True)
    
    # create a meta class
    class Meta:
        model = ServiceClient
        fields ='__all__' 
        read_only_fields = ["id"]
    
    def create(self, validated_data):
        
        campagneMarketing = ServiceClient.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance    
          

        
class LigneCommandeSerializer(serializers.ModelSerializer):
    produit = ProduitSerializer(read_only=True)
    produit_id = serializers.PrimaryKeyRelatedField(queryset=Produit.objects.all(), source='produit', write_only=True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = LigneCommande
        fields = ['id', 'produit', 'quantite', 'date_ajout', 'produit_id','total']
    def get_total(self, obj):
        return obj.total()
    def validate(self, data):
        produit = data['produit']
        quantite = data['quantite']
        if produit.quantite < quantite:
            raise ValidationError(f'La quantité demandée ({quantite}) dépasse la quantité disponible ({produit.quantite}).')
        return data
    
    def create(self, validated_data):    
         ligneCommande = LigneCommande.objects.create(**validated_data)
         return ligneCommande

class CommandeSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)
    paniers = LigneCommandeSerializer(many=True)
    total_quantite = serializers.SerializerMethodField()
    total_prix = serializers.SerializerMethodField()

    class Meta:
        model = Commande
        fields = '__all__'
        read_only_fields = ['id', 'total_quantite', 'total_prix']
    
       
    def get_total_quantite(self, obj):
        return obj.total_quantite()

    def get_total_prix(self, obj):
        return obj.total_prix()
    
    def create(self, validated_data):
        paniers_data = validated_data.pop('paniers')
        commande = Commande.objects.create(**validated_data)
        
        for panier_data in paniers_data:
            ligne_commande = LigneCommande.objects.create(**panier_data)
            commande.paniers.add(ligne_commande)
        if commande.statut == 'Valide':
            vente = Vente.objects.create(
                client=commande.client,
                date_fin=commande.date_fin,
                commande=commande,
                total_prix= commande.total_prix(),
                total_quantite=commande.total_quantite(),
            
            )
            for panier_data in paniers_data:
                    produit = panier_data['produit']
                    quantite = panier_data['quantite']
                    produit.quantite -= quantite
                    produit.save()
            vente.paniers.set(commande.paniers.all())
            vente.save()
        return commande
    
    def update(self, instance, validated_data):
        paniers_data = validated_data.pop('paniers', [])
        instance.date_fin = validated_data.get('date_fin', instance.date_fin)
        instance.client = validated_data.get('client', instance.client)
        instance.statut = validated_data.get('statut', instance.statut)
        instance.save()
        instance.paniers.clear()
        for panier_data in paniers_data:
            ligne_commande = LigneCommande.objects.create(**panier_data)
            instance.paniers.add(ligne_commande)
        if instance.statut == 'Valide':
            vente, created = Vente.objects.get_or_create(
                    client=instance.client,
                date_fin=instance.date_fin,
                commande=instance,
                total_prix= instance.total_prix(),
                total_quantite=instance.total_quantite(),
            )
            vente.paniers.set(instance.paniers.all())
            vente.save()
        return instance


        
    
class VenteSerializer(serializers.ModelSerializer):
        client = ClientSerializer(read_only=True)
        client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)
        paniers = LigneCommandeSerializer(many=True)
      
        class Meta:
            model = Vente
            fields = '__all__'
        
            
        
        

                

                  