from rest_framework import viewsets
from .models import SalesReport
from .serializers import SalesReportSerializer

class SalesReportViewSet(viewsets.ModelViewSet):
    queryset = SalesReport.objects.all()
    serializer_class = SalesReportSerializer