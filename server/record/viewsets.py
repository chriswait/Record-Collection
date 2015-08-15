from django.shortcuts import get_object_or_404
from record.models import Record, Artist, Track
from record.serializers import RecordSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer

    def retrieve(self, request, pk=None):
        record = Record.objects.get(pk=pk)
        serializer = RecordSerializer(record)
        return Response(serializer.data)
