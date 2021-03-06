from django.db import models

class DiscogsModel(models.Model):
    discogs_id = models.IntegerField(null=True)
    class Meta:
        abstract = True

class Record(DiscogsModel):
    title = models.CharField(max_length=200)
    year = models.IntegerField(null=True)
    thumb = models.URLField()
    notes = models.TextField(null=True)

    artists = models.ManyToManyField('Artist')
    tracklist = models.ManyToManyField('Track')
    to_download = models.NullBooleanField()
    downloaded = models.NullBooleanField()

    listening_notes = models.TextField(null=True)

    def __str__(self):
        return "%s (%s)" % (self.title, self.year)

    def get_absolute_url(self):
        return "/api/records/%i/" % self.id

class Artist(DiscogsModel): 
    name = models.CharField(max_length=200)

    listening_notes = models.TextField(null=True)

    def __str__(self):
        return "%s" % (self.name)


class Track(models.Model):
    title = models.CharField(max_length=200)
    duration = models.CharField(max_length=200)
    position = models.CharField(max_length=20)

    listening_notes = models.TextField(null=True)

    def __str__(self):
        return "%s | %s | %s" % (self.position, self.title, self.duration)

class Collection(models.Model):
    records = models.ManyToManyField('Record')
