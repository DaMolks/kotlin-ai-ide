#!/bin/bash

# Script d'installation et de lancement global

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction de log
log() {
    echo -e "${GREEN}[KOTLIN-AI-IDE]${NC} $1"
}

# Fonction d'erreur
error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances frontend..."
    yarn install

    log "Installation des dépendances backend..."
    cd backend
    yarn install
    cd ..
}

# Build du projet
build_project() {
    log "Construction du projet..."
    yarn build
    cd backend
    yarn build
    cd ..
}

# Démarrage des services
start_services() {
    log "Démarrage des services..."
    
    # Backend
    cd backend
    yarn dev &
    backend_pid=$!
    cd ..

    # Frontend
    yarn start &
    frontend_pid=$!

    # Attendre une entrée utilisateur
    log "Services démarrés. Appuyez sur Entrée pour arrêter."
    read

    # Arrêter les processus
    kill $backend_pid $frontend_pid
}

# Fonction principale
main() {
    install_dependencies
    build_project
    start_services
}

# Exécution
main