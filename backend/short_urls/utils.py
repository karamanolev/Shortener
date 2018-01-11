import json
import random
from datetime import datetime, date

from django.http import HttpResponse


def gen_short_url(length):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyz') for _ in range(length))


def json_serialize(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def json_response(data):
    return HttpResponse(
        json.dumps(
            data,
            default=json_serialize,
        ),
        content_type='application/json',
    )
