#!/bin/bash
# Script de despliegue automático del TFG Restaurante Asiático en el VPS

# Detener la ejecución si ocurre algún error
set -e

echo "=================================================="
echo " 1. Actualizando repositorio local desde Git"
echo "=================================================="
git pull origin master

echo ""
echo "=================================================="
echo " 2. Logueando en Docker Hub"
echo "=================================================="
docker login -u dmorrid -p Rsjwvb12_

echo ""
echo "=================================================="
echo " 3. Construyendo imágenes de Docker de forma secuencial"
echo "=================================================="
cd docker/megacrossover

echo "Construyendo base (ubbase01)..."
docker build -t dmorrid/ubbase01 -f dockerfiles/ubbase/jhlwubbase .

echo "Construyendo seguridad (ubseguridad01)..."
docker build -t dmorrid/ubseguridad01 -f dockerfiles/ubseguridad/jhlwubseguridad .

echo "Construyendo nginx base (nginx101)..."
docker build -t dmorrid/nginx101 -f dockerfiles/sweb/nginx/jhlwnginx .

echo "Construyendo base de datos (postgre01)..."
docker build -t dmorrid/postgre01 -f dockerfiles/postgre/jhlwpostgre .

echo "Construyendo Next.js Frontend (restaurante_frontend01)..."
docker build --build-arg NEXT_PUBLIC_API_URL=//backend.api.recuperacion.asiaticohuercal.es -t dmorrid/restaurante_frontend01 -f dockerfiles/nginxrestaurante/jhlwnginxrestaurante .

echo "Construyendo NestJS Backend (restaurante_backend01)..."
docker build -t dmorrid/restaurante_backend01 -f dockerfiles/nest/jhlwrestaurante .

echo ""
echo "=================================================="
echo " 4. Subiendo imágenes optimizadas a Docker Hub"
echo "=================================================="
docker push dmorrid/ubbase01:latest
docker push dmorrid/ubseguridad01:latest
docker push dmorrid/nginx101:latest
docker push dmorrid/postgre01:latest
docker push dmorrid/restaurante_frontend01:latest
docker push dmorrid/restaurante_backend01:latest

echo ""
echo "=================================================="
echo " 5. Actualizando recursos en Kubernetes mediante Helm"
echo "=================================================="
# Volver a cargar el chart usando los valores limpios
sudo microk8s helm3 upgrade restaruante proyecto/personal/restaruante --reset-values

echo ""
echo "=================================================="
echo " 6. Reiniciando pods para descargar y aplicar las nuevas imágenes"
echo "=================================================="
sudo microk8s kubectl rollout restart deployment/restaurante-frontend
sudo microk8s kubectl rollout restart deployment/restaurante-backend

echo ""
echo "=================================================="
echo " ¡Despliegue automático finalizado correctamente!"
echo "=================================================="
