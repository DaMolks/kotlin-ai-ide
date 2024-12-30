Write-Host "Démarrage de Kotlin AI IDE..."

# Démarrage de CodeLlama
Start-Process -NoNewWindow powershell -ArgumentList "-Command cd codellama; python main.py --model models/codellama-7b.Q4_K_M.gguf --interactive"

# Attendre que CodeLlama démarre
Start-Sleep -Seconds 5

# Démarrer le backend
Start-Process -NoNewWindow powershell -ArgumentList "-Command cd backend; yarn start"

# Démarrer le frontend
Start-Process -NoNewWindow powershell -ArgumentList "-Command cd frontend; yarn start"