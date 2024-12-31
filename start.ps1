Get-Process | Where-Object {$_.ProcessName -match 'node|npm'} | ForEach-Object {
    try {
        $_.Kill()
        $_.WaitForExit()
    } catch {}
}

# Installation des dépendances backend
Set-Location backend
npm install
npm run build
Set-Location ..

# Installation des dépendances frontend
Set-Location frontend
npm install
Set-Location ..

# Démarrage des services
Set-Location backend
Start-Process -FilePath \"npm.cmd\" -ArgumentList \"start\" -NoNewWindow
Set-Location ..

Set-Location frontend
Start-Process -FilePath \"npm.cmd\" -ArgumentList \"start\" -NoNewWindow
Set-Location ..

Write-Host \"IDE démarré! Accédez à http://localhost:3000\" -ForegroundColor Green
Write-Host \"Appuyez sur CTRL+C pour arrêter\" -ForegroundColor Yellow

while ($true) {
    Start-Sleep -Seconds 1
}`
