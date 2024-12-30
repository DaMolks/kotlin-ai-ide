# Fonction pour vérifier les dépendances
function Test-Dependencies {
    $missing = @()

    # Vérifier Node.js
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        $missing += "Node.js"
    }

    # Vérifier Python
    if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
        $missing += "Python"
    }

    # Vérifier Git
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        $missing += "Git"
    }

    # Vérifier Yarn
    if (-not (Get-Command yarn -ErrorAction SilentlyContinue)) {
        $missing += "Yarn"
    }

    return $missing
}

# Fonction pour installer les dépendances du projet
function Install-ProjectDependencies {
    Write-Host "Vérification des dépendances du projet..."

    # Backend
    Write-Host "Installation des dépendances backend..." -ForegroundColor Yellow
    Push-Location backend
    yarn install
    yarn build
    Pop-Location

    # Frontend
    Write-Host "Installation des dépendances frontend..." -ForegroundColor Yellow
    Push-Location frontend
    yarn install
    yarn build
    Pop-Location
}

# Fonction pour vérifier et installer CodeLlama
function Initialize-CodeLlama {
    if (-not (Test-Path codellama)) {
        Write-Host "Installation de CodeLlama..." -ForegroundColor Yellow
        git clone https://github.com/facebookresearch/codellama.git codellama
        Push-Location codellama
        python -m pip install -r requirements.txt
        
        Write-Host "Téléchargement du modèle CodeLlama..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Force -Path models
        $modelUrl = "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf"
        $modelPath = "models/codellama-7b.Q4_K_M.gguf"
        
        if (-not (Test-Path $modelPath)) {
            Invoke-WebRequest -Uri $modelUrl -OutFile $modelPath
        }
        Pop-Location
    }
}

# Vérification principale
Write-Host "Vérification de l'environnement..." -ForegroundColor Cyan
$missingDeps = Test-Dependencies

if ($missingDeps.Count -gt 0) {
    Write-Host "\nDépendances manquantes :" -ForegroundColor Red
    foreach ($dep in $missingDeps) {
        Write-Host " - $dep" -ForegroundColor Red
    }
    Write-Host "\nVeuillez installer les dépendances manquantes avant de continuer." -ForegroundColor Red
    exit 1
}

# Installation et vérification du projet
try {
    Write-Host "\nInitialisation du projet..." -ForegroundColor Cyan
    Initialize-CodeLlama
    Install-ProjectDependencies

    Write-Host "\nDémarrage de l'IDE..." -ForegroundColor Cyan
    
    # Arrêter les processus existants
    Get-Process | Where-Object {$_.ProcessName -match 'node|python'} | Stop-Process -Force -ErrorAction SilentlyContinue

    # Démarrer les services
    $codeLlama = Start-Process python -ArgumentList "codellama/llama_cpp/example.py", "--model", "codellama/models/codellama-7b.Q4_K_M.gguf", "--interactive" -PassThru -NoNewWindow
    Start-Sleep -Seconds 2  # Attendre que CodeLlama démarre

    $backend = Start-Process yarn -ArgumentList "start" -WorkingDirectory "backend" -PassThru -NoNewWindow
    Start-Sleep -Seconds 2  # Attendre que le backend démarre

    $frontend = Start-Process yarn -ArgumentList "start" -WorkingDirectory "frontend" -PassThru -NoNewWindow

    Write-Host "\nIDE démarré avec succès!" -ForegroundColor Green
    Write-Host "Accédez à http://localhost:3000" -ForegroundColor Green
    Write-Host "Appuyez sur CTRL+C pour arrêter l'IDE" -ForegroundColor Yellow

    # Attendre et gérer l'arrêt
    try {
        Wait-Process -Id $codeLlama.Id
    } finally {
        Write-Host "\nArrêt de l'IDE..." -ForegroundColor Yellow
        Stop-Process -Id $codeLlama.Id -Force -ErrorAction SilentlyContinue
        Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
        Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue
        Write-Host "IDE arrêté" -ForegroundColor Green
    }
} catch {
    Write-Host "\nErreur lors du démarrage : $_" -ForegroundColor Red
    exit 1
}
