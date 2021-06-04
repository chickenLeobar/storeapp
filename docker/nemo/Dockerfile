FROM  python:3.9-slim as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1



FROM node:15 as webpack

RUN apt-get update 
RUN python --version

# centrar directory
WORKDIR /opt/assets

ADD ./assets/package*.json ./

RUN  npm install

RUN npm rebuild node-sass 

COPY ./assets ./

RUN npm run build_prod


# install dependeces
FROM base as python-deps

WORKDIR /opt/app
RUN pip install --upgrade pip
RUN pip install pipenv

RUN apt-get update && apt-get install -y --no-install-recommends gcc

ADD requeriments.txt .

RUN pip install -r requeriments.txt

COPY . .

RUN rm -r assets

COPY --from=webpack opt/assets/bundles assets/bundles/
COPY --from=webpack opt/assets/lib assets/lib/

ENV author="leobar37"

ENTRYPOINT [ "python", "manage.py"]

RUN python manage.py makemigrations & python manage.py migrate

EXPOSE 8000

CMD ["runserver" , "0.0.0.0:8000"]
















