# Configuration
$ENV:CODELLAMA_PATH = "./codellama"

# Vérification de CodeLlama
if (-not (Test-Path $ENV:CODELLAMA_PATH)) {
    Write-Host "CodeLlama non trouvé. Téléchargement..."
    # Ajouter commande de téléchargement
}

# Démarrage du backend
Start-Process -NoNewWindow powershell -ArgumentList "-Command cd backend; yarn start"

# Démarrage de CodeLlama
Start-Process -NoNewWindow powershell -ArgumentList "-Command cd $ENV:CODELLAMA_PATH; python main.py --interactive"

# Démarrage du frontend
cd frontend
yarn start