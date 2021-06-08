

from typing import Any
import uuid
from os import path
def drive_upload_image(instance : Any , filename: str):
    name , ext = path.splitext(filename)
    return "uploads/{}.{}".format(uuid.uuid4(), {ext})
