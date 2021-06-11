from cloudinary import *
import cloudinary
from django.http.response import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from conf.settings import env
from rest_framework.status import HTTP_400_BAD_REQUEST
from datetime import datetime
import json


@api_view(['POST'])
def get_sign_url(request):
    timestamp = datetime.now()

    if not request.POST.get('public_id'):
        response = {
            'error': 'public id was not provided'
        }
        return HttpResponse(json.dumps(response), status=HTTP_400_BAD_REQUEST)
    api_key = env('CLOUDINARY_APIKEY', default=None)

    if(api_key == None):
        raise Exception("No cloudinary key was provided")

    signature = cloudinary.utils.api_sign_request({
        'timestamp': timestamp.microsecond,
        'public_id': 'mi_image',
        'eager': 'w_400,h_300,c_pad|w_260,h_200,c_crop'
    }, api_key)

    return Response({'signature': signature})
