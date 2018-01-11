import json
from json import JSONDecodeError

from django.http import HttpResponse, HttpResponsePermanentRedirect
from django.views.decorators.csrf import csrf_exempt

from short_urls.models import UrlMapping
from short_urls.utils import json_response


@csrf_exempt
def links(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode())
        except JSONDecodeError:
            return HttpResponse('Bad JSON', status=400)
        url = data.get('url')
        if not url:
            return HttpResponse('Bad or missing URL', status=400)
        mapping = UrlMapping(full_url=url)
        mapping.generate_and_save()
        return json_response({
            'hash': mapping.short_url,
        })
    else:
        return HttpResponse('Unsupported method', status=400)


@csrf_exempt
def link(request, url_hash):
    try:
        mapping = UrlMapping.objects.get(short_url=url_hash)
    except UrlMapping.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return json_response({
            'id': mapping.id,
            'dateCreated': mapping.date_created,
            'hash': mapping.short_url,
            'fullUrl': mapping.full_url,
        })
    elif request.method == 'PATCH':
        try:
            data = json.loads(request.body.decode())
        except JSONDecodeError:
            return HttpResponse('Bad JSON', status=400)
        url = data.get('url')
        if not url:
            return HttpResponse('Bad or missing URL', status=400)

        mapping.full_url = url
        mapping.save()
        return HttpResponse()
    elif request.method == 'DELETE':
        mapping.delete()
        return HttpResponse()
    else:
        return HttpResponse('Unsupported method', status=400)


@csrf_exempt
def link_redirect(request, url_hash):
    try:
        mapping = UrlMapping.objects.get(short_url=url_hash)
    except UrlMapping.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return HttpResponsePermanentRedirect(mapping.full_url)
    else:
        return HttpResponse('Unsupported method', status=400)
