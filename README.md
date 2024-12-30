# 🚀 Kotlin AI IDE

> Un IDE Kotlin moderne propulsé par l'IA pour une expérience de développement Android augmentée

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fonctionnalités

🤖 **Assistant IA Intégré**
- Communication naturelle avec CodeLlama
- Suggestions de code intelligentes
- Aide au debugging en temps réel

📝 **Support Kotlin Complet**
- Coloration syntaxique avancée
- Auto-complétion intelligente
- Détection d'erreurs en direct

🛠️ **Outils Android**
- Compilation intégrée
- Gestion des projets Android
- Support Gradle

## 🚀 Guide de Démarrage

### Prérequis

📋 Assurez-vous d'avoir installé :
- Node.js (v14+)
- Yarn
- Java JDK (v11+)
- Kotlin Compiler
- CodeLlama

### Installation

```bash
# Cloner le repository
git clone https://github.com/DaMolks/kotlin-ai-ide.git

# Installer les dépendances frontend
cd kotlin-ai-ide
yarn install

# Installer les dépendances backend
cd backend
yarn install
```

### Démarrage

```bash
# Terminal 1 - Backend
cd backend
yarn dev

# Terminal 2 - Frontend
cd ..
yarn start
```

🌐 L'application sera disponible sur : `http://localhost:3000`

## 🏗️ Architecture

```
kotlin-ai-ide/
├── src/               # Code source frontend
│   ├── browser/       # Interface utilisateur
│   └── common/        # Code partagé
├── backend/           # Serveur Node.js
│   ├── src/           # Code source backend
│   └── services/      # Services (AI, Kotlin)
└── package.json       # Configuration projet
```

## 🤝 Contribution

1. 🍴 Forker le projet
2. 🔧 Créer une branche (`git checkout -b feature/amazing`)
3. 📝 Commiter les changements (`git commit -m 'feat: ajout fonctionnalité'`)
4. 🚀 Pusher (`git push origin feature/amazing`)
5. 🎉 Ouvrir une Pull Request

## 📚 Documentation

### Configuration IDE

```typescript
// Configurer les extensions Kotlin
window.monaco.languages.register({ id: 'kotlin' });
```

### Utilisation de l'IA

```kotlin
// Exemple d'interaction avec l'IA
AI.suggest("Crée une activité Android avec une RecyclerView")
```

### API Backend

```typescript
// Communication WebSocket
socket.emit('compile', { code: sourceCode });
```

## 🔧 Configuration

### Paramètres CodeLlama
```json
{
  "model": "codellama",
  "temperature": 0.7,
  "maxTokens": 2048
}
```

### Configuration Kotlin
```json
{
  "compiler": {
    "version": "1.8.0",
    "jvmTarget": "11"
  }
}
```

## 🐛 Débogage

### Logs Communs
```bash
# Erreur de compilation Kotlin
ERROR: Could not compile: MyClass.kt

# Problème de connexion IA
ERROR: AI connection timeout
```

## 📱 Captures d'écran

*À venir*

## 📖 Licence

MIT © [DaMolks](https://github.com/DaMolks)

---

⭐️ N'hésitez pas à mettre une étoile si ce projet vous est utile !