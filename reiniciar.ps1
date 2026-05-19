# MarketPlus - Reinicio Completo
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MARKETPLUS - REINICIO COMPLETO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Detener procesos node
Write-Host "[1/3] Deteniendo procesos..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "  Procesos detenidos" -ForegroundColor Green

# Limpiar cache de Angular
Write-Host "`n[2/3] Limpiando cache..." -ForegroundColor Yellow
Remove-Item -Path "C:\Users\HP\Music\ingwebb\MarketPlus\frontend\.angular" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "  Cache limpiado" -ForegroundColor Green

# Iniciar backend
Write-Host "`n[3/3] Iniciando servicios..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\HP\Music\ingwebb\MarketPlus\backend; npm run dev"
Write-Host "  Backend iniciado en nueva ventana" -ForegroundColor Green

Start-Sleep -Seconds 3

# Iniciar frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\HP\Music\ingwebb\MarketPlus\frontend; npm start"
Write-Host "  Frontend iniciado en nueva ventana" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SERVICIOS INICIADOS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:2626" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3000" -ForegroundColor White
Write-Host "`n  Abre http://localhost:2626 en tu navegador" -ForegroundColor Yellow
Write-Host "  Presiona F12 para ver la consola de errores`n" -ForegroundColor Yellow
