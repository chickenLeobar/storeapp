from django.template import Library
from django.utils.safestring import SafeString
import json

register = Library()


@register.filter("escapedict")
def escapedict(data):
    if not isinstance(data, dict):
        return data
    for key in data:
        if isinstance(data[key], int) and not isinstance(data[key], bool):
            data[key] = int(SafeString(data[key]))
        else:
            data[key] = SafeString(data[key])

    return json.dumps(data)
