from rest_framework import serializers
# from .models import Product, Cart, CartItem
from .models import Todo, Product, InvoiceItem, Invoice

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class InvoiceItemSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = InvoiceItem
        fields = '__all__'

    def create(self, validated_data):
        item = validated_data.pop('item')
        print(item + 'item')
        product = Product.objects.get(id=item.id) # get the product
        print(product + 'product')
        invoice_item = InvoiceItem.objects.create(item=product, **validated_data)
        return invoice_item 

class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        invoice = Invoice.objects.create(**validated_data)
        for item_data in items_data:
            # Create InvoiceItem without passing 'invoice' again in item_data
            InvoiceItem.objects.create(invoice=invoice, **item_data)
        return invoice
