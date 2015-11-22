from django.http import HttpResponse
from django.shortcuts import render, redirect
import json
from models import Record, Artist, Track
from discogs import add_record_with_barcode,  add_record_with_discogs_id, get_discogs_search_json

def index(request):
    return render(request, 'record/base.html')

def delete_record(request):
    request_object = json.loads(request.body)
    if (not(request_object.has_key('id')) or not(request_object['id'])): 
        return HttpResponse("0")
    id = request_object['id']
    item = Record.objects.get(id=id)
    item.delete()
    return HttpResponse(json.dumps({"status":1}))

def add_record(request):
    request_object = json.loads(request.body)
    if (not(request_object.has_key('discogs_id')) or not(request_object['discogs_id'])): 
        return HttpResponse("0")
    discogs_id = request_object['discogs_id']
    record = add_record_with_discogs_id(discogs_id)

    if not(record):
        return HttpResponse("0")
    else:
        return redirect(record)

def update_item(request):
    request_object = json.loads(request.body)
    if (not(request_object.has_key('type')) or not(request_object['type'])): 
        return HttpResponse("0")
    if (not(request_object.has_key('id')) or not(request_object['id'])): 
        return HttpResponse("0")

    item = None
    type = request_object['type']
    id = request_object['id']

    # find the item
    if (type=="record"):
        item = Record.objects.get(id=id)
    elif (type=="track"):
        item = Track.objects.get(id=id)
    if not(item): return redirect(index)
    
    # update the item
    if (request_object.has_key('listening_notes') and request_object['listening_notes']):
        item.listening_notes = request_object['listening_notes']
    if (type=="record"):
        if (request_object.has_key('to_download')):
            item.to_download = (request_object['to_download']==True)
        if (request_object.has_key('downloaded')):
            item.downloaded = (request_object['downloaded']==True)
    item.save()

    return redirect(item)

def search(request):
    request_object = json.loads(request.body)
    if (not(request_object.has_key('query')) or not(request_object['query'])): 
        return HttpResponse("0")
    query = request_object['query']
    response = get_discogs_search_json(query)
    return HttpResponse(response)
