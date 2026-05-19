# MarketPlus - Script de Verificación
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MARKETPLUS - DIAGNOSTICO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 1. Verificar MySQL
Write-Host "[1/4] Verificando MySQL..." -ForegroundColor Yellow
try {
    $mysqlPath = "C:\xampp\mysql\bin\mysql.exe"
    if (Test-Path $mysqlPath) {
        $result = & $mysqlPath -u root -e "USE marketplus_db; SELECT COUNT(*) as total FROM productos WHERE estado='activo';" 2>&1
        Write-Host "  MySQL: OK - $result productos activos" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: MySQL no encontrado en C:\xampp\mysql\bin\" -ForegroundColor Red
        Write-Host "  -> Inicia XAMPP Control Panel y arranca MySQL" -ForegroundColor Red
    }
} catch {
    Write-Host "  ERROR: No se pudo conectar a MySQL" -ForegroundColor Red
    Write-Host "  -> Verifica que MySQL este corriendo en XAMPP" -ForegroundColor Red
}

# 2. Verificar Backend
Write-Host "`n[2/4] Verificando Backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/products?page=1&limit=1" -Method GET -TimeoutSec 3 -UseBasicParsing 2>$null
    if ($response.StatusCode -eq 200) {
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  Backend: OK - Puerto 3000 respondiendo" -ForegroundColor Green
        Write-Host "  API Response: success=$($data.success)" -ForegroundColor Green
    }
} catch {
    Write-Host "  ERROR: Backend no responde en http://localhost:3000" -ForegroundColor Red
    Write-Host "  -> Ejecuta: cd C:\Users\HP\Music\ingwebb\MarketPlus\backend; npm run dev" -ForegroundColor Red
}

# 3. Verificar Node.js
Write-Host "`n[3/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v 2>&1
    Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Node.js no instalado" -ForegroundColor Red
}

# 4. Verificar dependencias
Write-Host "`n[4/4] Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "C:\Users\HP\Music\ingwebb\MarketPlus\backend\node_modules") {
    Write-Host "  Backend node_modules: OK" -ForegroundColor Green
} else {
    Write-Host "  ERROR: Backend dependencias no instaladas" -ForegroundColor Red
    Write-Host "  -> Ejecuta: cd C:\Users\HP\Music\ingwebb\MarketPlus\backend; npm install" -ForegroundColor Red
}

if (Test-Path "C:\Users\HP\Music\ingwebb\MarketPlus\frontend\node_modules") {
    Write-Host "  Frontend node_modules: OK" -ForegroundColor Green
} else {
    Write-Host "  ERROR: Frontend dependencias no instaladas" -ForegroundColor Red
    Write-Host "  -> Ejecuta: cd C:\Users\HP\Music\ingwebb\MarketPlus\frontend; npm install" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  COMANDOS PARA INICIAR:" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "1. Iniciar XAMPP (MySQL)" -ForegroundColor White
Write-Host "2. Backend:  cd C:\Users\HP\Music\ingwebb\MarketPlus\backend; npm run dev" -ForegroundColor White
Write-Host "3. Frontend: cd C:\Users\HP\Music\ingwebb\MarketPlus\frontend; npm start" -ForegroundColor White
Write-Host "`nO todo junto: cd C:\Users\HP\Music\ingwebb\MarketPlus; npm start`n" -ForegroundColor White
