@echo off

echo Installation du projet Kotlin AI IDE

:: Verification Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js non installe
    exit /b 1
)

:: Verification Yarn
yarn --version >nul 2>&1
if errorlevel 1 (
    echo Yarn non installe
    npm install -g yarn
)

:: Installation des dependances
echo Installation des dependances...
call yarn install

cd backend
call yarn install
cd ..

:: Build du projet
echo Construction du projet...
call yarn build

cd backend
call yarn build
cd ..

:: Demarrage des services
echo Demarrage des services...

start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

echo Services demarres !
pause