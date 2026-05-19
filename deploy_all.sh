#!/bin/bash
# Script de despliegue automático del TFG Restaurante Asiático en Docker (sin Kubernetes)

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
docker build --build-arg NEXT_PUBLIC_API_URL=http://backend.api.recuperacion.asiaticohuercal.es -t dmorrid/restaurante_frontend01 -f dockerfiles/nginxrestaurante/jhlwnginxrestaurante .

echo "Construyendo NestJS Backend (restaurante_backend01)..."
docker build -t dmorrid/restaurante_backend01 -f dockerfiles/nest/jhlwrestaurante .

# Volver a la raíz del proyecto para Docker Compose
cd ../..

echo ""
echo "=================================================="
echo " 4. Liberando puertos de red en el servidor (Apagando MicroK8s)"
echo "=================================================="
# Apagamos microk8s en caso de que esté activo para liberar el puerto 80
if command -v microk8s &> /dev/null; then
    echo "Deteniendo MicroK8s..."
    sudo microk8s stop || true
fi

echo ""
echo "=================================================="
echo " 5. Arrancando la aplicación en Docker Compose"
echo "=================================================="
# Bajamos los contenedores anteriores si existen
docker compose down || true

# Levantamos la nueva versión en segundo plano
docker compose up -d

echo ""
echo "=================================================="
echo " ¡Despliegue exclusivo en Docker completado con éxito!"
echo "=================================================="
