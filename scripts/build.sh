#!/bin/bash

# Build frontend
yarn install
yarn build

# Build backend
cd backend
yarn install
yarn build

# Copy configurations
cp src/templates/android/basic/* lib/templates/android/

# Build success check
if [ $? -eq 0 ]; then
    echo "Build completed successfully"
    exit 0
else
    echo "Build failed"
    exit 1
fi