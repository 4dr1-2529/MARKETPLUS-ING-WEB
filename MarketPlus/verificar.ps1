# ============================================
# MARKETPLUS - VERIFICAR ESTADO
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MARKETPLUS - Verificacion" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Node.js
Write-Host "Node.js:" -ForegroundColor Yellow
try { node --version } catch { Write-Host "  ❌ No instalado" -ForegroundColor Red }

# npm
Write-Host "npm:" -ForegroundColor Yellow
try { npm --version } catch { Write-Host "  ❌ No instalado" -ForegroundColor Red }

# Angular CLI
Write-Host "Angular CLI:" -ForegroundColor Yellow
try { ng version --json | Out-Null; Write-Host "  ✅ Instalado" -ForegroundColor Green } catch { Write-Host "  ❌ No instalado - Ejecutar: npm install -g @angular/cli" -ForegroundColor Red }

# MySQL
Write-Host "MySQL:" -ForegroundColor Yellow
$mysql = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue
if ($mysql -and $mysql.Status -eq "Running") {
    Write-Host "  ✅ Corriendo" -ForegroundColor Green
} else {
    Write-Host "  ❌ No instalado o detenido" -ForegroundColor Red
    Write-Host "  Instalar: https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
}

# Dependencias Backend
Write-Host "Backend node_modules:" -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "  ✅ Instaladas" -ForegroundColor Green
} else {
    Write-Host "  ❌ No instaladas - Ejecutar: cd backend && npm install" -ForegroundColor Red
}

# Dependencias Frontend
Write-Host "Frontend node_modules:" -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "  ✅ Instaladas" -ForegroundColor Green
} else {
    Write-Host "  ❌ No instaladas - Ejecutar: cd frontend && npm install" -ForegroundColor Red
}

# .env
Write-Host "Backend .env:" -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    Write-Host "  ✅ Configurado" -ForegroundColor Green
} else {
    Write-Host "  ❌ No existe - Copiar .env.example a .env" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
