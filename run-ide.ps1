# Vérifier si codellama existe, sinon l'installer
if (-not (Test-Path codellama)) {
    Write-Host "Installation de CodeLlama..."
    git clone https://github.com/facebookresearch/codellama.git codellama
    cd codellama
    pip install -r requirements.txt
    
    # Télécharger le modèle
    New-Item -ItemType Directory -Force -Path models
    Invoke-WebRequest -Uri "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf" -OutFile "models/codellama-7b.Q4_K_M.gguf"
    cd ..
}

# Arrêter les processus existants
Get-Process | Where-Object {$_.ProcessName -match 'node|python'} | Stop-Process -Force

# Démarrer CodeLlama
$codeLlama = Start-Process python -ArgumentList "codellama/llama_cpp/example.py", "--model", "codellama/models/codellama-7b.Q4_K_M.gguf", "--interactive" -PassThru -NoNewWindow

# Démarrer le backend
$backend = Start-Process yarn -ArgumentList "start" -WorkingDirectory "backend" -PassThru -NoNewWindow

# Démarrer le frontend
$frontend = Start-Process yarn -ArgumentList "start" -WorkingDirectory "frontend" -PassThru -NoNewWindow

Write-Host "IDE démarré! Accédez à http://localhost:3000"
Write-Host "Appuyez sur CTRL+C pour tout arrêter"

try {
    Wait-Process -Id $codeLlama.Id
} finally {
    Stop-Process -Id $codeLlama.Id -Force
    Stop-Process -Id $backend.Id -Force
    Stop-Process -Id $frontend.Id -Force
}