function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $args
    $host.UI.RawUI.ForegroundColor = $fc
}

function Stop-ProjectProcesses {
    Write-ColorOutput Green \"Arrêt des processus en cours...\"
    
    Get-Process | Where-Object {$_.ProcessName -match 'node|npm'} | ForEach-Object {
        try {
            $_.Kill()
            $_.WaitForExit()
        } catch {}
    }
    
    Start-Sleep -Seconds 2
}

function Install-Dependencies {
    Write-ColorOutput Green \"Installation des dépendances...\"
    
    # Backend
    if (-not (Test-Path \"backend\
ode_modules\")) {
        Set-Location backend
        Write-ColorOutput Yellow \"Installation des dépendances backend...\"
        & npm install
        & npm run build
        Set-Location ..
    }
    
    # Frontend
    if (-not (Test-Path \"frontend\
ode_modules\")) {
        Set-Location frontend
        Write-ColorOutput Yellow \"Installation des dépendances frontend...\"
        & npm install
        Set-Location ..
    }
}

function Start-Services {
    Write-ColorOutput Green \"Démarrage des services...\"
    
    # Backend
    Set-Location backend
    Start-Process -FilePath \"npm.cmd\" -ArgumentList \"start\" -NoNewWindow
    Set-Location ..
    Start-Sleep -Seconds 2
    
    # Frontend
    Set-Location frontend
    Start-Process -FilePath \"npm.cmd\" -ArgumentList \"start\" -NoNewWindow
    Set-Location ..
}

try {
    Stop-ProjectProcesses
    Install-Dependencies
    Start-Services
    
    Write-ColorOutput Yellow \"Appuyez sur CTRL+C pour arrêter l'IDE\"
    Write-ColorOutput Green \"Accédez à l'interface via: http://localhost:3000\"
    
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-ColorOutput Red \"Erreur: $_\"
    Stop-ProjectProcesses
    exit 1
} finally {
    Stop-ProjectProcesses
}`
