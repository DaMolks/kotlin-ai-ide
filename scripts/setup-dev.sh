#!/bin/bash

# Check requirements
command -v node >/dev/null 2>&1 || { echo "Node.js is required"; exit 1; }
command -v yarn >/dev/null 2>&1 || { echo "Yarn is required"; exit 1; }
command -v kotlinc >/dev/null 2>&1 || { echo "Kotlin compiler is required"; exit 1; }

# Install dependencies
yarn install

# Setup development environment
mkdir -p .theia
cp configs/settings.json .theia/

# Setup Android SDK if needed
if [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "Please set ANDROID_SDK_ROOT environment variable"
fi

echo "Development environment setup complete"