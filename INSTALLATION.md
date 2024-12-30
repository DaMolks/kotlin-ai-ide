# Guide d'Installation Détaillé 💻

## Prérequis Système

### Environnement de Base
- Node.js v14+ (`node -v` pour vérifier)
- Yarn (`npm install -g yarn`)
- Git

### Java & Kotlin
1. Java JDK 11+
   ```bash
   # Vérifier l'installation
   java -version
   ```

2. Kotlin Compiler
   ```bash
   # Installation via SDKMAN
   curl -s "https://get.sdkman.io" | bash
   source "$HOME/.sdkman/bin/sdkman-init.sh"
   sdk install kotlin
   ```

### Android SDK
1. Télécharger Android Studio
2. Dans Android Studio:
   - Tools > SDK Manager
   - Installer:
     - Android SDK Platform 30
     - Android Build Tools 30.0.3
3. Configurer les variables d'environnement:
   ```bash
   export ANDROID_SDK_ROOT=/chemin/vers/android-sdk
   export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
   ```

### CodeLlama
1. Cloner CodeLlama:
   ```bash
   git clone https://github.com/facebookresearch/codellama
   cd codellama
   pip install -r requirements.txt
   ```
2. Télécharger le modèle depuis HuggingFace

## Installation du Projet

1. Cloner le repository:
   ```bash
   git clone https://github.com/DaMolks/kotlin-ai-ide.git
   cd kotlin-ai-ide
   ```

2. Configuration:
   ```bash
   # Copier le fichier d'environnement
   cp .env.example .env
   # Éditer avec vos chemins
   nano .env
   ```

3. Installation des dépendances:
   ```bash
   # Frontend
   yarn install

   # Backend
   cd backend
   yarn install
   cd ..
   ```

4. Build:
   ```bash
   # Donner les permissions d'exécution
   chmod +x scripts/build.sh
   
   # Build
   ./scripts/build.sh
   ```

## Démarrage

1. Backend:
   ```bash
   cd backend
   yarn start
   ```

2. Frontend (nouveau terminal):
   ```bash
   yarn start
   ```

3. Accéder à l'IDE: http://localhost:3000

## Vérification

1. Tests:
   ```bash
   yarn test
   ```

2. Vérifier les logs:
   ```bash
   tail -f backend/logs/app.log
   ```

## Dépannage Courant

### Erreur: JAVA_HOME non défini
```bash
export JAVA_HOME=/chemin/vers/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

### Erreur: Android SDK introuvable
Vérifier ANDROID_SDK_ROOT dans .env

### Erreur: CodeLlama ne démarre pas
Vérifier le chemin du modèle dans .env

## Notes
- Utiliser Node.js LTS
- 8GB RAM minimum recommandé
- GPU recommandé pour CodeLlama