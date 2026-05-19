#!/bin/bash
set -e

LOG_DIR="/root/logs"
LOG_FILE="$LOG_DIR/informe_frontend.log"

log() {
    echo "$1"
    echo "$1" >> "$LOG_FILE"
}

load_entrypoint_base(){
    log "Cargando entrypoint base (SSH, usuario, sudo)..."
    if [ -f /root/admin/base/jhlwstart.sh ]; then
        bash /root/admin/base/jhlwstart.sh || log "ADVERTENCIA: Entrypoint base falló, continuando..."
        log "Entrypoint base ejecutado"
    else
        log "ADVERTENCIA: jhlwstart.sh de base no encontrado"
    fi
}

directorio_de_trabajo(){
    log "Cambiando directorio al proyecto Next.js..."

    if cd /root/admin/node/proyectos/restaurante_frontend; then
        log "Directorio cambiado a: $(pwd)"
    else
        log "ERROR: No se pudo cambiar al directorio del proyecto Next.js"
        exit 1
    fi
}

arrancar_next(){
    NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-http://backend.api.recuperacion.asiaticohuercal.es}"
    export NEXT_PUBLIC_API_URL
    log "Usando API URL: $NEXT_PUBLIC_API_URL"

    log "Arrancando Next.js en primer plano..."
    exec HOST=0.0.0.0 PORT=3000 npm start
}

main(){
    mkdir -p "$LOG_DIR"
    touch "$LOG_FILE"
    log "=== Iniciando contenedor Next.js Frontend ==="
    log "Fecha: $(date)"
    load_entrypoint_base
    directorio_de_trabajo
    arrancar_next
}

main