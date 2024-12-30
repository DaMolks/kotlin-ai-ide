@echo off

echo Installation du projet Kotlin AI IDE

npm install -g yarn

yarn install

cd backend
yarn install
cd ..

yarn build

cd backend
yarn build
cd ..

start "Backend" cmd /c "cd backend && yarn dev"
start "Frontend" cmd /c "yarn start"

pause