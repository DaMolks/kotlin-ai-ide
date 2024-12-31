$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Stop-ProjectProcesses {
    Write-ColorOutput Green "Arrêt des processus en cours..."
    
    Get-Process | Where-Object {$_.ProcessName -match 'node|python|yarn'} | ForEach-Object {
        try {
            $_.Kill()
            $_.WaitForExit()
        } catch {}
    }
    
    # Attendre que les ports se libèrent
    Start-Sleep -Seconds 2
}

function Install-Dependencies {
    Write-ColorOutput Green "Vérification des dépendances..."
    
    # Backend
    if (-not (Test-Path "backend\node_modules")) {
        Set-Location backend
        Write-ColorOutput Yellow "Installation des dépendances backend..."
        yarn install
        yarn build
        Set-Location ..
    }
    
    # Frontend
    if (-not (Test-Path "frontend\node_modules")) {
        Set-Location frontend
        Write-ColorOutput Yellow "Installation des dépendances frontend..."
        yarn install
        Set-Location ..
    }
}

function Start-Services {
    Write-ColorOutput Green "Démarrage des services..."
    
    # Backend
    Set-Location backend
    $backend = Start-Process yarn -ArgumentList "start" -NoNewWindow -PassThru
    Set-Location ..
    Start-Sleep -Seconds 2
    
    # Frontend
    Set-Location frontend
    $frontend = Start-Process yarn -ArgumentList "start" -NoNewWindow -PassThru
    Set-Location ..
    
    return @{Backend = $backend; Frontend = $frontend}
}

function Wait-ForServices($processes) {
    Write-ColorOutput Yellow "Appuyez sur CTRL+C pour arrêter l'IDE"
    Write-ColorOutput Green "Accédez à l'interface via: http://localhost:3000"
    
    try {
        Wait-Process -Id $processes.Backend.Id
    } catch {
        Stop-ProjectProcesses
    } finally {
        Write-ColorOutput Green "Arrêt de l'IDE."
    }
}

try {
    # Nettoyage initial
    Stop-ProjectProcesses
    
    # Installation/Vérification des dépendances
    Install-Dependencies
    
    # Démarrage des services
    $processes = Start-Services
    
    # Attente et gestion de l'arrêt
    Wait-ForServices $processes
} catch {
    Write-ColorOutput Red "Erreur: $_"
    Stop-ProjectProcesses
    exit 1
}