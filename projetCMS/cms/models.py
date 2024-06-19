from django.db import models

# Create your models here.
class CampagneMarketing(models.Model):
    nomCampagne = models.CharField(max_length=50)
    objectif = models.TextField(max_length=100)
    date_debut = models.DateField()
    date_fin = models.DateField()
    document =
    media =
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
   
    def __str__(self):
        return self.nomProduit
    
    
statut=[
   ('Approuvé','Approuvé'),
   ( 'Refusé', 'Refusé'),
    ('Reglé','Reglé'),
    ('Encour de traitement','Encour de traitement')
]
# Create your models here.
class ServiceClient(models.Model):
    
    date_demande = models.DateField()
    problemeSignale = models.TextField(max_length=50)
    statut= models.CharField(max_length = 30,choices=statut )
    client = models.ForeignKey(ClientProspect,on_delete=models.CASCADE,null=False)
    gestionnaire= models.ForeignKey(Gestionnaire,on_delete=models.CASCADE,null=False)
    
    def __str__(self):
        return self.id


class Commande(models.Model):
   
    date_fin = models.DateField()
    quantite = models.IntegerField()
    client= models.ForeignKey(ClientProspect,on_delete=models.CASCADE,null=False)
    total= models.ForeignKey(Produit,on_delete=models.CASCADE,null=False)
    #prix=produit.prix
    #total=prix*quantite
    def __str__(self):
        return self.id    
                