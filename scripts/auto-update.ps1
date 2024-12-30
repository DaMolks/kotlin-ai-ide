# Configuration
$repoPath = "S:\Users\Dimitry\Documents\kotlin-ai-ide-main"
$interval = 30  # secondes

Write-Host "Démarrage de l'auto-update pour $repoPath"

Set-Location $repoPath

# Configuration initiale Git si nécessaire
if (-not (Test-Path .git)) {
    git init
    git remote add origin https://github.com/DaMolks/kotlin-ai-ide.git
    git fetch
}

# S'assurer qu'on est sur main
git checkout main -f
git branch --set-upstream-to=origin/main main

while ($true) {
    try {
        # Pull des changements
        $output = git pull
        
        if ($output -ne "Already up to date.") {
            Write-Host "[$(Get-Date)] Mise à jour détectée !"
            Write-Host $output
        }
    } catch {
        Write-Host "Erreur lors de la mise à jour: $_"
    }
    
    Start-Sleep -Seconds $interval
}