# Créer le dossier codellama s'il n'existe pas
New-Item -ItemType Directory -Force -Path codellama
Set-Location codellama

# Cloner le repo CodeLlama
git clone https://github.com/facebookresearch/codellama.git .

# Installer les dépendances Python
pip install -r requirements.txt

# Créer le dossier models
New-Item -ItemType Directory -Force -Path models
Set-Location models

# Télécharger le modèle
$modelUrl = "https://huggingface.co/TheBloke/CodeLlama-7B-GGUF/raw/main/codellama-7b.Q4_K_M.gguf"
$outputFile = "codellama-7b.Q4_K_M.gguf"

Write-Host "Téléchargement du modèle..."
Invoke-WebRequest -Uri $modelUrl -OutFile $outputFile

Write-Host "Installation terminée!"