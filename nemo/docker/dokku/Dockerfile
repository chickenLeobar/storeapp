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

RUN ls

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
RUN ls

COPY --from=webpack opt/assets/bundles assets/bundles/

EXPOSE 8000

CMD [ "python" , "manage.py" , "runserver" , "0.0.0.0:8000"]
















