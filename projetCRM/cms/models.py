from django.db import models
from django.core.exceptions import ValidationError
from datetime import date
# Create your models here.
class CampagneMarketing(models.Model):
    nomCampagne = models.CharField(max_length=50)
    objectif = models.TextField(max_length=100)
    date_debut = models.DateField(default=date.today())
    date_fin = models.DateField(default=date.today())
    document =models.FileField(upload_to='documents/',default='/media/document.pdf')
    media =models.ImageField(upload_to='images/',default='/media/img.jpeg')
    video= models.FileField(upload_to='videos/',default='/media/video.mp3')
    def __str__(self):
        return self.nomCampagne

    
class   Category (models.Model):
    nomCategory = models.CharField(max_length=50)
    description = models.TextField(max_length=100)
 
    def __str__(self):
        return self.nomCategory

class ClientProspect(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    telephone = models.CharField(max_length = 30, default = '+237678963685')
    address = models.CharField(max_length = 30, )
 
    def __str__(self):
        return self.nom

class Client(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    telephone = models.CharField(max_length = 30, default = '+237678963685')
    address = models.CharField(max_length = 30, )
 
    def __str__(self):
        return self.nom



class Gestionnaire(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    telephone = models.CharField(max_length = 30, default = '+237678963685')
    address = models.CharField(max_length = 30, )
    def __str__(self):
        return self.nom
    
    
class Produit(models.Model):
    nomProduit = models.CharField(max_length=50)
    description = models.TextField(max_length=100)
    quantite = models.IntegerField()
    prix = models.IntegerField()
    category = models.ForeignKey(Category,on_delete=models.CASCADE,null=True)
    def nom_category(self):
        return self.produit.nomCategory
    def __str__(self):
        return self.nomProduit
    
    
statut=[
    ('Nouveau','Nouveau'),
    ('Encour','Encour de traitement'),
   ( 'Refuse', 'Refusé'),
    ('Regle','Reglé'),
       ('Ferme','Fermé')
   
    
]
# Create your models here.
class ServiceClient(models.Model):
    
    date_demande = models.DateField(default= date.today())
    problemeSignale = models.TextField(max_length=50)
    statut= models.CharField(max_length = 30,default='Nouveau', choices=statut )
    client = models.ForeignKey(ClientProspect,on_delete=models.CASCADE,null=False)
    gestionnaire= models.ForeignKey(Gestionnaire,on_delete=models.CASCADE,null=False)
    def nom_client(self):
        return self.produit.nomClient
    def nom_gestionnaire(self):
        return self.produit.nom
    def __str__(self):
        return self.id

statutCommande=[
    ('Nouveau','Nouveau'),
    ('Encour','Encour de traitement'),
   ( 'Annule', 'Annulé'),
    ('Valide','Validé'),
  
   
    
]
class Commande(models.Model):
    
    date_fin = models.DateField(default=date.today())
    quantite = models.IntegerField()
    statut= models.CharField(max_length = 30,default='Nouveau', choices=statutCommande )
    client= models.ForeignKey(ClientProspect,on_delete=models.CASCADE,null=False)
    produit = models.ManyToManyField(Produit)

    def prix_produit(self):
        return sum(produit.prix for produit in self.produit.all())

    def nom_produit(self):
        return ', '.join(produit.nom for produit in self.produit.all())

    def nom_client(self):
        return self.produit.nomClient
    def total(self):
        return sum(produit.prix * self.quantite for produit in self.produit.all())

    def save(self, *args, **kwargs):
        if self.pk is not None:  
            old_instance = Commande.objects.get(pk=self.pk)
            if old_instance.statut != 'Valide' and self.statut == 'Valide':
                
                vente = Vente(
                    date_vente=date.today(),
                    idCommande=self,
                    client=self.client,
                )
                vente.save()
                vente.produit.set(self.produit.all())
        super().save(*args, **kwargs)
    def __str__(self):
        return f"Commande {self.id} - Total: {self.total()}"
    
class Vente(models.Model):
   
    date_vente = models.DateField(default=date.today())
    idCommande= models.ForeignKey(Commande,on_delete=models.CASCADE,null=False)
    client= models.ForeignKey(ClientProspect,on_delete=models.CASCADE,null=False)
    produit = models.ManyToManyField(Produit)
    
    def clean(self):
        if self.idCommande.statut != 'Valide':
            raise ValidationError("Vente ne peu estre que si la commandé est validé .")
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    def nom_produit(self):
        return ', '.join(produit.nom for produit in self.produit.all())

    def nom_client(self):
        return self.client.nom  

    def qte_produit(self):
        return sum(produit.quantite for produit in self.produit.all())
    def total(self):
        return sum(produit.prix * produit.quantite for produit in self.produit.all())

    def __str__(self):
        return f"Vente {self.id} - Total: {self.total()}"