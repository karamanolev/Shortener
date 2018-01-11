import json
import random

from django.http import HttpResponse


def gen_short_url(length):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyz') for _ in range(length))


def json_response(data):
    return HttpResponse(json.dumps(data), content_type='application/json')
