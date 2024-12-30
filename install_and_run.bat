@echo off

:: Installation du projet Kotlin AI IDE
echo Installation du projet Kotlin AI IDE

:: Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js non installé
    exit /b 1
)

:: Vérifier Yarn
yarn --version >nul 2>&1
if errorlevel 1 (
    echo Yarn non installé
    npm install -g yarn
)

:: Installation des dépendances
echo Installation des dépendances...
yarn install

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
echo Démarrage des services...

start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

echo Services démarrés !
pause