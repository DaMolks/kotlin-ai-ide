# Trouver npm
$npmPath = "$env:APPDATA\npm\npm.cmd"
if (-not (Test-Path $npmPath)) {
    $npmPath = "C:\Program Files\nodejs\npm.cmd"
}
if (-not (Test-Path $npmPath)) {
    Write-Host "npm introuvable. Vérifiez que Node.js est installé." -ForegroundColor Red
    exit 1
}

# Installation de CodeLlama si nécessaire
if (-not (Test-Path "codellama")) {
    Write-Host "Installation de CodeLlama..." -ForegroundColor Yellow
    git clone https://github.com/facebookresearch/codellama.git
    Set-Location codellama
    python -m pip install -r requirements.txt
    
    # Créer dossier models et télécharger le modèle
    New-Item -ItemType Directory -Force -Path models
    $modelUrl = "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf"
    $modelPath = "models/codellama-7b.Q4_K_M.gguf"
    
    Write-Host "Téléchargement du modèle... (cela peut prendre du temps)" -ForegroundColor Yellow
    Invoke-WebRequest -Uri $modelUrl -OutFile $modelPath
    Set-Location ..
}

# Arrêter les processus existants
Get-Process | Where-Object {$_.ProcessName -match 'node|npm|python'} | ForEach-Object {
    try {
        $_.Kill()
        $_.WaitForExit()
    } catch {}
}

# Installation des dépendances backend
Set-Location backend
& $npmPath install
& $npmPath run build
Set-Location ..

# Installation des dépendances frontend
Set-Location frontend
& $npmPath install
Set-Location ..

# Démarrer CodeLlama
Set-Location codellama
$codeLlama = Start-Process python -ArgumentList "utils/run_ggml.py", "--model", "models/codellama-7b.Q4_K_M.gguf", "--interactive" -NoNewWindow -PassThru
Set-Location ..
Start-Sleep -Seconds 5

# Démarrage des services
Set-Location backend
Start-Process -FilePath $npmPath -ArgumentList "start" -NoNewWindow
Set-Location ..

Set-Location frontend
Start-Process -FilePath $npmPath -ArgumentList "start" -NoNewWindow
Set-Location ..

Write-Host "IDE démarré! Accédez à http://localhost:3000" -ForegroundColor Green
Write-Host "Appuyez sur CTRL+C pour arrêter" -ForegroundColor Yellow

while ($true) {
    try {
        Start-Sleep -Seconds 1
    } catch {
        break
    }
}

# Nettoyage à la sortie
Write-Host "Arrêt des services..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -match 'node|npm|python'} | ForEach-Object {
    try {
        $_.Kill()
        $_.WaitForExit()
    } catch {}
}
