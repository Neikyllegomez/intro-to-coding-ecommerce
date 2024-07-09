from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
    
class Product(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField(upload_to='images/', null=True)
    image_url = models.CharField(max_length=200, null=True)

    def _str_(self):
        return self.name
    
class InvoiceItem(models.Model):
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    total = models.FloatField()

    def _str_(self):
        return self.item.name
    
class Invoice(models.Model):
    items = models.ManyToManyField(InvoiceItem)
    total = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.date