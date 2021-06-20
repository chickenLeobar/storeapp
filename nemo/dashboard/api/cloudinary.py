from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from conf.settings import env
from datetime import datetime
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
import cloudinary
from cloudinary import uploader

cloudinary.config(
    cloud_name="wellnesspro",
    api_key=env('CLOUDINARY_APIKEY', default=None),
    api_secret=env('CLOUDINARY_APISECRET', default=None),
)
def generate_signature():
    timestamp = datetime.timestamp(datetime.now())
    api_key = env('CLOUDINARY_APISECRET', default=None)
    if api_key is None:
        raise Exception("No cloudinary key was provided")
    current_timestamp = timestamp
    signature = cloudinary.utils.api_sign_request({
        'timestamp': current_timestamp,
        'upload_preset': 'ml_default'
    }, api_key)
    return Response({'signature': signature, 'timestamp': current_timestamp})


class Cloudinary(APIView):
    def get(self , request : Request):
        return generate_signature()

    def delete(self, request: Request, format=None, *args, **kwargs):
        # obtain public id of param
        public_id = kwargs.get('id', -1)
        print(cloudinary.config().api_key)
        try:
            if public_id == -1:
                return Response({'error', 'public id not was provided'}, status=HTTP_400_BAD_REQUEST)
            result = uploader.destroy(public_id)
            return Response(result, status=200)
        except Exception as error:
            print(error)
            return Response({'error': 'error occurred whiles destroy resource'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
