@echo off
setlocal enabledelayedexpansion

:: Couleurs
set GREEN=[92m
set RED=[91m
set NC=[0m

:: Vérifier et installer les outils de build
:check_build_tools
echo %GREEN%Vérification des outils de build...%NC%

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Python non trouvé. Installation...%NC%
    powershell -Command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe' -OutFile 'python-installer.exe'}"
    start /wait python-installer.exe /quiet InstallAllUsers=1 PrependPath=1
    del python-installer.exe
)

:: Check Visual Studio Build Tools
if not exist "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools" (
    echo %RED%Visual Studio Build Tools non trouvés. Installation...%NC%
    powershell -Command "& {Invoke-WebRequest -Uri 'https://aka.ms/vs/17/release/vs_buildtools.exe' -OutFile 'vs_buildtools.exe'}"
    start /wait vs_buildtools.exe --quiet --wait --norestart --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows10SDK
    del vs_buildtools.exe
)

:: Vérifier Node.js et Yarn
:check_nodejs
node --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Node.js non installé. Installation...%NC%
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi' -OutFile 'nodejs-installer.msi'}"
    start /wait msiexec /i nodejs-installer.msi /qn
    del nodejs-installer.msi
)

yarn --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Yarn non installé. Installation...%NC%
    npm install -g yarn
)

:: Configuration des variables d'environnement
set PATH=%PATH%;%USERPROFILE%\AppData\Roaming\npm

:: Désactiver les warnings npm
npm config set fund false
npm config set audit false

:: Installation des dépendances
:install_deps
echo %GREEN%Installation des dépendances frontend...%NC%
yarn install --network-timeout 1000000

echo %GREEN%Installation des dépendances backend...%NC%
cd backend
yarn install --network-timeout 1000000
cd ..

:: Configuration de node-gyp et résolution des problèmes
:fix_build
cd node_modules\node-pty

echo %GREEN%Résolution des problèmes de compilation node-pty...%NC%
npm install -g node-gyp@10.2.0
node-gyp rebuild --python="C:\Program Files\Python311\python.exe"

cd ..\..

:: Build du projet
:build_project
echo %GREEN%Construction du projet...%NC%
yarn build
cd backend
yarn build
cd ..

:: Démarrage des services
:start_services
echo %GREEN%Démarrage des services...%NC%

start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

echo %GREEN%Services démarrés !%NC%
pause

exit /b 0