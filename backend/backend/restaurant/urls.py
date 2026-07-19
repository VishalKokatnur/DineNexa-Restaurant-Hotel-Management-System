from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MenuItemViewSet,
    RestaurantTableViewSet,
    OrderViewSet,
    KitchenOrderViewSet,
    BillViewSet,
    CustomerViewSet
)

router = DefaultRouter()

router.register('menu-items', MenuItemViewSet)
router.register('tables', RestaurantTableViewSet)
router.register('orders', OrderViewSet)
router.register('kitchen-orders', KitchenOrderViewSet)
router.register('bills', BillViewSet)
router.register('customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]