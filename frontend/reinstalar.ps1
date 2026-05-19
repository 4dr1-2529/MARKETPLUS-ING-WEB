# Cierra "npm start" antes de ejecutar este script (Ctrl+C en esa terminal)

Write-Host "Reinstalando frontend MarketPlus..." -ForegroundColor Cyan
Set-Location $PSScriptRoot

Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*ingwebb*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

if (Test-Path node_modules) {
    cmd /c "rmdir /s /q node_modules"
}
if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }
if (Test-Path .angular) { cmd /c "rmdir /s /q .angular" }

npm install
Write-Host "Listo. Ejecuta: npm start" -ForegroundColor Green
