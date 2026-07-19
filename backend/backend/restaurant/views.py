from rest_framework import viewsets
from .models import MenuItem, RestaurantTable, Order, KitchenOrder, Bill, Customer
from .serializers import (
    MenuItemSerializer,
    RestaurantTableSerializer,
    OrderSerializer,
    KitchenOrderSerializer,
    BillSerializer,
    CustomerSerializer
)
from inventory.models import RecipeItem


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


class RestaurantTableViewSet(viewsets.ModelViewSet):
    queryset = RestaurantTable.objects.all()
    serializer_class = RestaurantTableSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        order = serializer.save()

        for menu_item in order.items.all():
            recipes = RecipeItem.objects.filter(menu_item=menu_item)

            for recipe in recipes:
                inventory = recipe.inventory_item

                if inventory.quantity >= recipe.quantity_used:
                    inventory.quantity -= recipe.quantity_used
                    inventory.save()


class KitchenOrderViewSet(viewsets.ModelViewSet):
    queryset = KitchenOrder.objects.all()
    serializer_class = KitchenOrderSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer