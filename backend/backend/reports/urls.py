from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalesReportViewSet

router = DefaultRouter()
router.register('sales-reports', SalesReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]