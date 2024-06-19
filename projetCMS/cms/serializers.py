from rest_framework import serializers
from .models import *
from .models import CampagneMarketing





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
        
    def create(self, validated_data):
        
        campagneMarketing = CampagneMarketing.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance    
        
class GestionnaireSerializer(serializers.ModelSerializer):
 
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
          

class ClientSerializer(serializers.ModelSerializer):
 
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
                    
class ProduitSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Produit
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        campagneMarketing = Produit.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance
    
class ServiceClientSerializer(serializers.ModelSerializer):
 
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
             
class CommandeSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Commande
        fields = '__all__' 
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        
        campagneMarketing = Commande.objects.create(**validated_data)

        return campagneMarketing
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance    
                     