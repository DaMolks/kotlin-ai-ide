@echo off
setlocal enabledelayedexpansion

:: Vérifie les prérequis
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js n'est pas installé. Installez Node.js.
    exit /b 1
)

where yarn >nul 2>nul
if %errorlevel% neq 0 (
    echo Yarn n'est pas installé. Installez Yarn avec : npm install -g yarn
    exit /b 1
)

:: Installation des dépendances
echo Installation des dépendances frontend...
yarn install

echo Installation des dépendances backend...
cd backend
yarn install
cd ..

:: Build du projet
echo Construction du projet...
yarn build
cd backend
yarn build
cd ..

:: Démarrage des services
start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

echo Services démarrés. Fermez les fenêtres pour arrêter.
pause