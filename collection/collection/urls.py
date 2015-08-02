from django.conf.urls import include, url
from django.contrib import admin

from record.models import Record, Artist, Track
from record.serializers import RecordSerializer, ArtistSerializer, TrackSerializer
from record.viewsets import RecordViewSet
from rest_framework import routers

record_router = routers.DefaultRouter()
record_router.register(r'records', RecordViewSet)

urlpatterns = [
    url(r'^', include('record.urls')),
    url(r'^api/', include(record_router.urls)),
    url(r'^admin/', include(admin.site.urls)),
]
