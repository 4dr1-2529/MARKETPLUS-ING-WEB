# MARKETPLUS - Configurar MySQL (XAMPP)
# Ejecutar en PowerShell

$mysql = "C:\xampp\mysql\bin\mysql.exe"
$base = "C:\Users\HP\Music\ingwebb\MarketPlus"

Write-Host "Iniciando MySQL..." -ForegroundColor Yellow
Start-Process -FilePath "C:\xampp\mysql_start.bat" -WindowStyle Hidden
Start-Sleep -Seconds 5

Write-Host "Importando base de datos..." -ForegroundColor Yellow
& $mysql -u root -e "source $base/database/marketplus.sql"
& $mysql -u root -e "source $base/database/seed.sql"

Write-Host "Listo. Tablas:" -ForegroundColor Green
& $mysql -u root -e "USE marketplus_db; SHOW TABLES;"

Write-Host ""
Write-Host "Ahora ejecuta el backend:" -ForegroundColor Cyan
Write-Host "  cd $base\backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
