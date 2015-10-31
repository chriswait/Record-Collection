import discogs_client
from config import discogs_token, discogs_key, discogs_secret
from requests import get

client = discogs_client.Client('TestApp/0.1 +http://records.chriswait.net', user_token=discogs_token )

def add_record(release):
    from models import Record, Artist, Track
    release_discogs_id = release.id
    try:
        # Check if we already have this album
        existing = Record.objects.get(discogs_id=release_discogs_id)
        return existing
    except Record.DoesNotExist:
        # Process record
        record_title = release.title
        if (len(record_title.split('- '))>1):
            record_title = record_title.split('- ')[1]
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

def add_record_with_barcode(barcode=""):
    if not(barcode): return 0
    releases = client.search('', barcode=barcode, type="release")
    if not(len(releases)): return 0

    # TODO: handle multiple barcode matches
    release = releases[0]
    return add_record(release)

def add_record_with_discogs_id(discogs_id=""):
    if not(discogs_id): return 0
    release = client.release(discogs_id)
    if not(release): return 0
    return add_record(release)

def get_discogs_search_json(query):
    url = "https://api.discogs.com/database/search?q=%s&type=release&key=%s&secret=%s" % (query, discogs_key, discogs_secret)
    headers = { "User-Agent": "TestApp/0.1 +http://records.chriswait.net"}
    request = get(url, headers=headers)
    json = request.text
    return json
