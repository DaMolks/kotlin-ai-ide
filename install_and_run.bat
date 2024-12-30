@echo off
setlocal enabledelayedexpansion

:: Script d'installation et de lancement global pour Windows

:: Couleurs
set GREEN=[92m
set RED=[91m
set NC=[0m

:: Fonction de log
:log
echo %GREEN%[KOTLIN-AI-IDE]%NC% %*
exit /b

:: Fonction d'erreur
:error
echo %RED%[ERREUR]%NC% %*
exit /b

:: Installation des dépendances
:install_dependencies
call :log Installation des dépendances frontend...
yarn install

call :log Installation des dépendances backend...
cd backend
yarn install
cd ..
exit /b

:: Build du projet
:build_project
call :log Construction du projet...
yarn build
cd backend
yarn build
cd ..
exit /b

:: Démarrage des services
:start_services
call :log Démarrage des services...

:: Backend
start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

call :log Services démarrés. Fermez les fenêtres pour arrêter.
pause
exit /b

:: Fonction principale
:main
call :install_dependencies
call :build_project
call :start_services

:: Exécution
call :main