from django.contrib import admin
from .models import Todo, Product, Invoice, InvoiceItem
# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'image', 'image_url')
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ( 'total', 'date')
class InvoiceItemAdmin(admin.ModelAdmin):
    list_display = ('item', 'quantity', 'price', 'total')

admin.site.register(Product, ProductAdmin)