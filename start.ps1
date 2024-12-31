# Fonction pour arrêter les processus existants
function Stop-ExistingProcesses {
    Write-Host "Arrêt des processus existants..."
    Get-Process | Where-Object {$_.ProcessName -match 'node|python'} | ForEach-Object {
        try {
            $_.Kill()
            $_.WaitForExit()
        } catch {}
    }
}

# Fonction pour vérifier CodeLlama
function Initialize-CodeLlama {
    $codeLlamaPath = Join-Path $PSScriptRoot "codellama"
    
    if (-not (Test-Path $codeLlamaPath)) {
        Write-Host "Installation de CodeLlama..."
        git clone https://github.com/facebookresearch/codellama.git $codeLlamaPath
    }

    Push-Location $codeLlamaPath
    if (-not (Test-Path "models")) {
        New-Item -ItemType Directory -Force -Path "models"
    }

    $modelPath = Join-Path "models" "codellama-7b.Q4_K_M.gguf"
    if (-not (Test-Path $modelPath)) {
        Write-Host "Téléchargement du modèle..."
        $modelUrl = "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf"
        Invoke-WebRequest -Uri $modelUrl -OutFile $modelPath
    }
    
    # Installation des dépendances Python
    pip install -r requirements.txt
    Pop-Location
}

# Arrêter les processus existants
Stop-ExistingProcesses

# Initialiser CodeLlama
Initialize-CodeLlama

# Démarrer les services
Write-Host "Démarrage des services..."

# CodeLlama
$codeLlamaPath = Join-Path $PSScriptRoot "codellama"
$codeLlama = Start-Process python -ArgumentList "main.py", "--model", "models/codellama-7b.Q4_K_M.gguf", "--interactive" -WorkingDirectory $codeLlamaPath -PassThru -NoNewWindow

# Attendre que CodeLlama démarre
Start-Sleep -Seconds 5

# Backend
$backendPath = Join-Path $PSScriptRoot "backend"
$backend = Start-Process yarn -ArgumentList "start" -WorkingDirectory $backendPath -PassThru -NoNewWindow

# Attendre que le backend démarre
Start-Sleep -Seconds 5

# Frontend
$frontendPath = Join-Path $PSScriptRoot "frontend"
$frontend = Start-Process yarn -ArgumentList "start" -WorkingDirectory $frontendPath -PassThru -NoNewWindow

Write-Host ""
Write-Host "IDE démarré! Accédez à http://localhost:3000" -ForegroundColor Green
Write-Host "Appuyez sur CTRL+C pour arrêter" -ForegroundColor Yellow

# Gérer l'arrêt propre
try {
    Wait-Process -Id $codeLlama.Id
} finally {
    Stop-ExistingProcesses
}