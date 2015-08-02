from django.contrib import admin

from .models import Record, Artist, Track, Collection
admin.site.register(Record)
admin.site.register(Artist)
admin.site.register(Track)
admin.site.register(Collection)
