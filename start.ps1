# Trouver npm
$npmPath = "$env:APPDATA\npm\npm.cmd"
if (-not (Test-Path $npmPath)) {
    $npmPath = "C:\Program Files\nodejs\npm.cmd"
}
if (-not (Test-Path $npmPath)) {
    Write-Host "npm introuvable. Vérifiez que Node.js est installé." -ForegroundColor Red
    exit 1
}

# Arrêter les processus existants
Get-Process | Where-Object {$_.ProcessName -match 'node|npm'} | ForEach-Object {
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
    Start-Sleep -Seconds 1
}
