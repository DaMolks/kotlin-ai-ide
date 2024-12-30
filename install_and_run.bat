@echo off

:: Couleurs
set GREEN=[92m
set RED=[91m
set NC=[0m

echo %GREEN%Installation du projet Kotlin AI IDE%NC%

:: Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Node.js non installé%NC%
    exit /b 1
)

:: Vérifier Yarn
yarn --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Yarn non installé%NC%
    npm install -g yarn
)

:: Installation des dépendances
echo %GREEN%Installation des dépendances...%NC%
yarn install

cd backend
yarn install
cd ..

:: Build du projet
echo %GREEN%Construction du projet...%NC%
yarn build
cd backend
yarn build
cd ..

:: Démarrage des services
echo %GREEN%Démarrage des services...%NC%

start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

echo %GREEN%Services démarrés !%NC%
pause