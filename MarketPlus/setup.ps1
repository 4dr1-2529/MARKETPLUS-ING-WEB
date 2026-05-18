# ============================================
# MARKETPLUS - SCRIPT DE INSTALACION AUTOMATICA
# Ejecutar en PowerShell como Administrador
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MARKETPLUS - Instalacion Automatica" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "[1/5] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js NO esta instalado" -ForegroundColor Red
    Write-Host "  Descargar desde: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar MySQL
Write-Host "[2/5] Verificando MySQL..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -eq "Running") {
    Write-Host "  ✅ MySQL esta corriendo" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  MySQL NO esta instalado o no esta corriendo" -ForegroundColor Yellow
    Write-Host "  Opciones:" -ForegroundColor Yellow
    Write-Host "  1. Instalar MySQL: https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
    Write-Host "  2. Instalar XAMPP: https://www.apachefriends.org/" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "¿Deseas continuar sin MySQL? (s/n)"
    if ($continue -ne "s") { exit }
}

# Instalar Angular CLI
Write-Host "[3/5] Instalando Angular CLI..." -ForegroundColor Yellow
npm install -g @angular/cli
Write-Host "  ✅ Angular CLI instalado" -ForegroundColor Green

# Instalar dependencias Backend
Write-Host "[4/5] Instalando dependencias del Backend..." -ForegroundColor Yellow
Set-Location backend
npm install
Write-Host "  ✅ Dependencias del backend instaladas" -ForegroundColor Green
Set-Location ..

# Instalar dependencias Frontend
Write-Host "[5/5] Instalando dependencias del Frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
Write-Host "  ✅ Dependencias del frontend instaladas" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  INSTALACION COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "SIGUIENTES PASOS:" -ForegroundColor Cyan
Write-Host "1. Configurar tu password de MySQL en backend/.env" -ForegroundColor White
Write-Host "2. Importar la base de datos (ver INSTALACION.md)" -ForegroundColor White
Write-Host "3. Ejecutar backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "4. Ejecutar frontend: cd frontend && npm start" -ForegroundColor White
Write-Host ""
