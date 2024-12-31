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

function Test-Command($command) {
    return (Get-Command $command -ErrorAction SilentlyContinue) -ne $null
}

function Check-Prerequisites {
    Write-ColorOutput Green \"Vérification des prérequis...\"
    
    if (-not (Test-Command \"node\")) {
        Write-ColorOutput Red \"Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org\"
        exit 1
    }
    
    if (-not (Test-Command \"npm\")) {
        Write-ColorOutput Red \"npm n'est pas installé. Veuillez réinstaller Node.js\"
        exit 1
    }
}

function Stop-ProjectProcesses {
    Write-ColorOutput Green \"Arrêt des processus en cours...\"
    
    Get-Process | Where-Object {$_.ProcessName -match 'node|python'} | ForEach-Object {
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
        npm install
        npm run build
        Set-Location ..
    }
    
    # Frontend
    if (-not (Test-Path \"frontend\
ode_modules\")) {
        Set-Location frontend
        Write-ColorOutput Yellow \"Installation des dépendances frontend...\"
        npm install
        Set-Location ..
    }
}

function Start-Services {
    Write-ColorOutput Green \"Démarrage des services...\"
    
    # Backend
    Set-Location backend
    $backend = Start-Process npx -ArgumentList \"nodemon\", \"dist/index.js\" -NoNewWindow -PassThru
    Set-Location ..
    Start-Sleep -Seconds 2
    
    # Frontend
    Set-Location frontend
    $frontend = Start-Process npm -ArgumentList \"start\" -NoNewWindow -PassThru
    Set-Location ..
    
    return @{Backend = $backend; Frontend = $frontend}
}

function Wait-ForServices($processes) {
    Write-ColorOutput Yellow \"Appuyez sur CTRL+C pour arrêter l'IDE\"
    Write-ColorOutput Green \"Accédez à l'interface via: http://localhost:3000\"
    
    try {
        Wait-Process -Id $processes.Backend.Id
    } catch {
        Stop-ProjectProcesses
    } finally {
        Write-ColorOutput Green \"Arrêt de l'IDE.\"
    }
}

try {
    Check-Prerequisites
    Stop-ProjectProcesses
    Install-Dependencies
    $processes = Start-Services
    Wait-ForServices $processes
} catch {
    Write-ColorOutput Red \"Erreur: $_\"
    Stop-ProjectProcesses
    exit 1
}`
