from record.models import Record, Artist, Track
from rest_framework import serializers

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'discogs_id', 'name', 'listening_notes', 'rating')

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('id', 'title', 'duration', 'position', 'listening_notes', 'rating')

class RecordSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)
    tracklist = TrackSerializer(many=True)
    class Meta:
        model = Record
        fields = ('id', 'discogs_id', 'title', 'year', 'thumb', 'notes', 'artists', 'tracklist', 'listening_notes', 'rating', 'to_download', 'downloaded')
