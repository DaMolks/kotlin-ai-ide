# Configuration
$repoPath = "S:\Users\Dimitry\Documents\kotlin-ai-ide-main"
$interval = 30  # secondes

Write-Host "Démarrage de l'auto-update pour $repoPath"

while ($true) {
    Set-Location $repoPath
    
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