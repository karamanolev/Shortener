from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt

from short_urls.models import UrlMapping
from short_urls.utils import json_response


@csrf_exempt
def links(request):
    if request.method == 'POST':
        url = request.POST.get('url')
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
def link(request, hash):
    try:
        mapping = UrlMapping.objects.get(short_url=hash)
    except UrlMapping.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return redirect(mapping.full_url)
    elif request.method == 'PATCH':
        url = request.POST.get('url')
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
