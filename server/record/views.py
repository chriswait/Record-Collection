from django.http import HttpResponse
from django.shortcuts import render, redirect
import json
from models import Record, Artist, Track
from discogs import add_record_with_barcode,  add_record_with_discogs_id, get_discogs_search_json

def index(request):
    return render(request, 'record/base.html')

def delete_record(request):
    if not(request.GET.get('id')): return 0
    id = request.GET.get('id')
    item = Record.objects.get(id=id)
    item.delete()
    return HttpResponse(json.dumps({"status":1}))

def add_record(request):
    if (request.GET.get('barcode')):
        barcode = request.GET.get('barcode')
        record = add_record_with_barcode(barcode)
    elif (request.GET.get('discogs_id')):
        discogs_id = request.GET.get('discogs_id')
        record = add_record_with_discogs_id(discogs_id)

    if not(record): return index(request)
    else: return redirect(record)

def update_item(request):
    if not(request.GET.get('type')): return 0
    if not(request.GET.get('id')): return 0

    item = None
    type = request.GET.get('type')
    id = request.GET.get('id')

    # find the item
    if (type=="record"):
        item = Record.objects.get(id=id)
    elif (type=="track"):
        item = Track.objects.get(id=id)
    if not(item): return redirect(index)
    
    # update the item
    if (request.GET.get('listening_notes') != None): item.listening_notes = request.GET.get('listening_notes')
    if (type=="record"):
        if (request.GET.get('to_download') != None):
            item.to_download = (request.GET.get('to_download')=="true")
        if (request.GET.get('downloaded') != None):
            item.downloaded = (request.GET.get('downloaded')=="true")
    item.save()

    return redirect(item)

def search(request):
    if not(request.GET.get('query')): return 0
    query = request.GET.get('query')
    response = get_discogs_search_json(query)
    return HttpResponse(response)
