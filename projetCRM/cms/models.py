from django.db import models
from django.core.exceptions import ValidationError
from datetime import date
# Create your models here.
class CampagneMarketing(models.Model):
    nomCampagne = models.CharField(max_length=50)
    objectif = models.TextField(max_length=100)
    date_debut = models.DateField(default=date.today())
    date_fin = models.DateField(default=date.today(),null=True)
    document =models.FileField(null=True)
    media =models.ImageField(null=True)
    video= models.FileField(null=True)
    def __str__(self):
        return self.nomCampagne
    def clean(self):
        if self.date_fin < self.date_debut:
            raise ValidationError('La date de fin ne peut pas être antérieure à la date de début.')

   
    
class   Category (models.Model):
    nomCategory = models.CharField(max_length=50)
    description = models.TextField(max_length=100 , null=True)
 
    def __str__(self):
        return self.nomCategory

class ClientProspect(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50, null=True)
    telephone = models.CharField(max_length = 30, default = '+237678963685', null=True)
    address = models.CharField(max_length = 30, null=True)
 
    def __str__(self):
        return self.nom

class Client(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50, null=True)
    telephone = models.CharField(max_length = 30, default = '+237678963685', null=True)
    address = models.CharField(max_length = 30, null=True)
 
    def __str__(self):
        return self.nom



class Gestionnaire(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50, null=True)
    telephone = models.CharField(max_length = 30, default = '+237678963685', null=True)
    address = models.CharField(max_length = 30, null=True)
    def __str__(self):
        return self.nom
    
    
class Produit(models.Model):
    nomProduit = models.CharField(max_length=50)
    description = models.TextField(max_length=100, null=True)
    quantite = models.IntegerField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category,on_delete=models.CASCADE, null=True)
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
    statut= models.CharField(max_length = 30,default='Nouveau', choices=statut, null=True )
    client = models.ForeignKey(Client,on_delete=models.CASCADE,null=False)
    gestionnaire= models.ForeignKey(Gestionnaire,on_delete=models.CASCADE,null=False)
    def nom_client(self):
        return self.produit.nomClient
    def nom_gestionnaire(self):
        return self.produit.nom
    def __str__(self):
        return self.id
    


class LigneCommande(models.Model):
    quantite = models.IntegerField(default=1)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE, null=True)
    date_ajout = models.DateField(auto_now_add=True)
    
    def total(self):
        return self.produit.prix * self.quantite
    def __str__(self):
        return f"Ligne de Commande {self.id}"
    
class Commande(models.Model):
    statutCommande = [
        ('Nouveau', 'Nouveau'),
        ('Encour', 'En cours de traitement'),
        ('Annule', 'Annulé'),
        ('Valide', 'Validé'),
    ]
    date_fin = models.DateField(default=date.today)
    statut = models.CharField(max_length=30, default='Nouveau', choices=statutCommande, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=False)
    paniers = models.ManyToManyField(LigneCommande, related_name='commandes')
    
    def total_prix(self):
        return sum(ligne_commande.produit.prix * ligne_commande.quantite for ligne_commande in self.paniers.all())
    
    def total_quantite(self):
        return sum(ligne_commande.quantite for ligne_commande in self.paniers.all())
    
    def __str__(self):
        return f"Commande {self.id} - Statut: {self.get_statut_display()}"





     
class Vente(models.Model):
    date_fin = models.DateField()
    paniers = models.ManyToManyField(LigneCommande, related_name='ventes')
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    commande = models.OneToOneField(Commande, on_delete=models.CASCADE)
    total_prix = models.DecimalField(max_digits=10, decimal_places=2)
    total_quantite = models.IntegerField()

    def __str__(self):
        return f"Vente {self.id} - Commande {self.commande.id}"
