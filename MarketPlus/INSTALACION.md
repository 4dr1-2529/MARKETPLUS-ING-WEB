# GUÍA DE INSTALACIÓN - MARKETPLUS

## PROBLEMAS DETECTADOS Y SOLUCIONES

### ❌ Problema 1: MySQL no está instalado
**Solución:** Instalar MySQL Server

### ❌ Problema 2: Angular CLI no está instalado
**Solución:** Instalar con npm

### ❌ Problema 3: Dependencias no instaladas
**Solución:** Ejecutar npm install

---

## PASO 1: INSTALAR MYSQL SERVER

### Opción A: MySQL Installer (Recomendado)
1. Descargar desde: https://dev.mysql.com/downloads/installer/
2. Elegir "mysql-installer-community" (version mas pequeña ~300MB)
3. En la instalacion seleccionar:
   - MySQL Server 8.0
   - MySQL Workbench (opcional, interfaz grafica)
4. Configurar:
   - Root password: `root123` (o el que quieras)
   - Puerto: 3306
   - Service Name: MySQL80

### Opción B: XAMPP (Mas facil, incluye MySQL + phpMyAdmin)
1. Descargar desde: https://www.apachefriends.org/
2. Instalar XAMPP
3. Abrir XAMPP Control Panel
4. Iniciar modulos: Apache y MySQL

---

## PASO 2: CONFIGURAR MYSQL

### Si instalaste MySQL directamente:
```bash
# Abrir MySQL Command Line Client
mysql -u root -p
# Ingresar tu contraseña

# Crear base de datos
CREATE DATABASE marketplus_db;

# Usar la base de datos
USE marketplus_db;

# Importar estructura
source C:\Users\HP\Music\ingwebb\MarketPlus\database\marketplus.sql;

# Importar datos de ejemplo
source C:\Users\HP\Music\ingwebb\MarketPlus\database\seed.sql;

# Verificar tablas
SHOW TABLES;

# Deberias ver 18 tablas
```

### Si usas XAMPP:
1. Abrir XAMPP Control Panel
2. Click en "Start" de MySQL
3. Abrir phpMyAdmin: http://localhost/phpmyadmin
4. Ir a pestaña "SQL"
5. Copiar y pegar el contenido de `database/marketplus.sql`
6. Ejecutar
7. Repetir con `database/seed.sql`

---

## PASO 3: INSTALAR DEPENDENCIAS

```bash
# Ir a la carpeta del proyecto
cd C:\Users\HP\Music\ingwebb\MarketPlus

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ..\frontend
npm install

# Volver a la raiz
cd ..
```

---

## PASO 4: CONFIGurar CONTRASEÑA MYSQL

Editar el archivo `backend/.env`:

```
DB_PASSWORD=tu_password_aqui
```

Cambiar `tu_password_aqui` por la contraseña que configuraste en MySQL.

---

## PASO 5: INSTALAR ANGULAR CLI

```bash
npm install -g @angular/cli
```

Verificar instalacion:
```bash
ng version
```

---

## PASO 6: EJECUTAR EL PROYECTO

### Terminal 1 - Backend:
```bash
cd C:\Users\HP\Music\ingwebb\MarketPlus\backend
npm run dev
```
Deberias ver:
```
✅ Conexión exitosa a MySQL - marketplus_db
========================================
  MARKETPLUS API - Backend Server
========================================
  Puerto: 3001
  URL: http://localhost:3001
========================================
```

### Importar productos desde DummyJSON (API tipo PokeAPI para tecnología):
```bash
cd C:\Users\HP\Music\ingwebb\MarketPlus\backend
npm run sync:dummyjson
```
Importa celulares, laptops, tablets, accesorios, smartwatch, gaming y movilidad con **imágenes reales** desde `cdn.dummyjson.com`. Puedes ejecutarlo de nuevo cuando quieras actualizar el catálogo.

### Terminal 2 - Frontend:
```bash
cd C:\Users\HP\Music\ingwebb\MarketPlus\frontend
npm start
```
Deberias ver:
```
** Angular Live Development Server is listening on localhost:2626 **
```

---

## CREDENCIALES DE PRUEBA

### Admin:
- Email: admin@marketplus.pe
- Password: 12345678

### Usuario:
- Email: carlos.rodriguez@gmail.com
- Password: 12345678

---

## URLS

- Frontend: http://localhost:2626
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api/products (probar en navegador)

---

## SOLUCION DE PROBLEMAS

### Error: "Error conectando a MySQL"
1. Verificar que MySQL este corriendo
2. Verificar contraseña en `backend/.env`
3. Verificar que la base de datos existe: `SHOW DATABASES;`

### Error: "ng no se reconoce"
```bash
npm install -g @angular/cli
```

### Error: "EACCES: permission denied"
Ejecutar PowerShell como Administrador

### Error: "Cannot find module"
```bash
cd backend
npm install
```

### Error: "Cannot find module caniuse-lite" (Frontend)
```bash
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Puerto ya en uso
Cambiar puerto en `backend/.env`:
```
PORT=3001
```
