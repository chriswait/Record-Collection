from django.http import HttpResponse
from django.shortcuts import render, redirect
from models import Record, Artist, Track
from config import discogs_token

def fetch_record_details_with_barcode(barcode=""):
    if not(barcode): return 0

    import discogs_client
    client = discogs_client.Client('TestApp/0.1', user_token=discogs_token )
    releases = client.search('', barcode=barcode)

    if not(len(releases)): return 0

    # TODO: handle multiple barcode matches
    release = releases[0]

    release_discogs_id = release.id
    try:
        # Check if we already have this album
        existing = Record.objects.get(discogs_id=release_discogs_id)
        return existing
    except Record.DoesNotExist:
        # Process record
        record_title = release.title
        if (len(record_title.split('- '))>0):
            record_title = release.title.split('- ')[1]
        record = Record(discogs_id = release_discogs_id, title = record_title, year = release.year, thumb = release.thumb, notes = release.notes)
        record.save()

        # Process artists
        for release_artist in release.artists:
            artist = Artist(discogs_id=release_artist.id, name=release_artist.name)
            artist.save()
            record.artists.add(artist)

        # Process tracklist
        for release_track in release.tracklist:
            track = Track()
            track.position = release_track.position
            track.title = release_track.title
            track.duration = release_track.duration
            track.save()
            record.tracklist.add(track)

        record.save()
        return record

def index(request):
    return render(request, 'record/base.html')

def add_record(request):
    if not(request.GET.get('barcode')): return 0

    barcode = request.GET.get('barcode')
    record = fetch_record_details_with_barcode(barcode)
    if not(record): return index(request)
    return redirect(record)
