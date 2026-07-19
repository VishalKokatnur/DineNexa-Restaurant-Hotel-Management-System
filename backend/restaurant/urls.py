from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MenuItemViewSet,
    RestaurantTableViewSet,
    OrderViewSet,
    KitchenOrderViewSet,
    BillViewSet,
    CustomerViewSet,
)

router = DefaultRouter()

router.register("menu-items", MenuItemViewSet, basename="menu-items")
router.register("tables", RestaurantTableViewSet, basename="tables")
router.register("orders", OrderViewSet, basename="orders")
router.register("kitchen-orders", KitchenOrderViewSet, basename="kitchen-orders")
router.register("bills", BillViewSet, basename="bills")
router.register("customers", CustomerViewSet, basename="customers")

urlpatterns = [
    path("", include(router.urls)),
]