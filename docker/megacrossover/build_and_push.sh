#!/bin/bash

echo "Logueando en Docker Hub..."
docker login -u dmorrid

echo "Construyendo imagenes..."
docker build -t dmorrid/ubbase01 -f dockerfiles/ubbase/jhlwubbase .
docker build -t dmorrid/ubseguridad01 -f dockerfiles/ubseguridad/jhlwubseguridad .
docker build -t dmorrid/nginx101 -f dockerfiles/sweb/nginx/jhlwnginx .
docker build -t dmorrid/postgre01 -f dockerfiles/postgre/jhlwpostgre .
docker build -t dmorrid/nginxpokeapi -f dockerfiles/nginxrestaurante/jhlwnginxrestaurante .
docker build -t dmorrid/restaurante_backend01 -f dockerfiles/nest/jhlwrestaurante .

echo "Subiendo imagenes a Docker Hub..."
docker push dmorrid/ubbase01
docker push dmorrid/ubseguridad01
docker push dmorrid/nginx101
docker push dmorrid/postgre01
docker push dmorrid/nginxpokeapi
docker push dmorrid/restaurante_backend01

echo "¡Todo listo!"
