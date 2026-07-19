from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet, RecipeItemViewSet


router = DefaultRouter()
router.register('items', InventoryItemViewSet)
router.register('recipe-items', RecipeItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]