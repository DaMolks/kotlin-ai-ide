# Vérification du dossier
if(-not (Test-Path codellama)) {
    Write-Host "Installation de CodeLlama..."
    git clone https://github.com/facebookresearch/codellama.git
    Set-Location codellama
    pip install -r requirements.txt
    
    # Créer dossier models
    New-Item -ItemType Directory -Force -Path models
    Set-Location models
    
    # Télécharger le modèle
    $modelUrl = "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf"
    Invoke-WebRequest -Uri $modelUrl -OutFile "codellama-7b.Q4_K_M.gguf"
    Set-Location ..
}

Write-Host "CodeLlama est prêt!"