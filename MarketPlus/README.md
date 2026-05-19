# MARKETPLUS - Tienda Online de Productos Tecnologicos

![MarketPlus](https://img.shields.io/badge/version-1.0.0-blue)
![Angular](https://img.shields.io/badge/Angular-17-DD0031)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)

Sistema completo de tienda online de productos tecnologicos con frontend en Angular, backend en Node.js/Express y base de datos MySQL. Proyecto universitario profesional.

---

## ESTRUCTURA DEL PROYECTO

```
MARKETPLUS/
├── frontend/                    # Aplicacion Angular (Cliente)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   │   ├── navbar/      # Barra de navegacion principal
│   │   │   │   ├── footer/      # Pie de pagina
│   │   │   │   ├── sidebar/     # Panel lateral de administracion
│   │   │   │   ├── loader/      # Indicador de carga
│   │   │   │   ├── toast/       # Notificaciones emergentes
│   │   │   │   ├── product-card/# Tarjeta de producto
│   │   │   │   ├── search-bar/  # Barra de busqueda
│   │   │   │   └── filter-panel/# Panel de filtros
│   │   │   ├── pages/           # Paginas principales
│   │   │   │   ├── home/        # Pagina de inicio
│   │   │   │   ├── login/       # Inicio de sesion
│   │   │   │   ├── register/    # Registro de usuario
│   │   │   │   ├── catalog/     # Catalogo de productos
│   │   │   │   ├── cart/        # Carrito de compras
│   │   │   │   ├── checkout/    # Proceso de pago
│   │   │   │   ├── profile/     # Perfil de usuario
│   │   │   │   ├── orders/      # Historial de pedidos
│   │   │   │   └── admin/       # Panel de administracion
│   │   │   ├── services/        # Servicios HTTP (API calls)
│   │   │   ├── models/          # Interfaces TypeScript
│   │   │   ├── guards/          # Guards de rutas (Auth, Admin)
│   │   │   ├── interceptors/    # Interceptores HTTP (JWT)
│   │   │   └── shared/          # Modulos compartidos
│   │   ├── environments/        # Variables de entorno
│   │   ├── assets/              # Imagenes, iconos, fuentes
│   │   ├── styles.css           # Estilos globales
│   │   ├── index.html           # HTML principal
│   │   └── main.ts              # Punto de entrada Angular
│   ├── angular.json             # Configuracion Angular
│   ├── package.json             # Dependencias frontend
│   └── tsconfig.json            # Configuracion TypeScript
│
├── backend/                     # API REST (Servidor)
│   ├── config/
│   │   └── database.js          # Conexion a MySQL (pool)
│   ├── controllers/             # Logica de negocio
│   │   ├── authController.js    # Login, registro, perfil
│   │   ├── productController.js # CRUD productos
│   │   ├── categoryController.js# CRUD categorias
│   │   ├── brandController.js   # CRUD marcas
│   │   ├── cartController.js    # Carrito de compras
│   │   ├── orderController.js   # Gestion de pedidos
│   │   └── adminController.js   # Dashboard admin
│   ├── routes/                  # Definicion de rutas API
│   │   ├── auth.js              # /api/auth/*
│   │   ├── products.js          # /api/products/*
│   │   ├── categories.js        # /api/categories/*
│   │   ├── brands.js            # /api/brands/*
│   │   ├── cart.js              # /api/cart/*
│   │   ├── orders.js            # /api/orders/*
│   │   └── admin.js             # /api/admin/*
│   ├── middleware/              # Middleware Express
│   │   ├── auth.js              # Verificacion JWT
│   │   └── admin.js             # Verificacion rol admin
│   ├── models/                  # Modelos de datos
│   ├── services/                # Servicios de negocio
│   ├── utils/                   # Utilidades
│   ├── uploads/                 # Archivos subidos
│   ├── database/                # Scripts SQL
│   ├── app.js                   # Configuracion Express
│   ├── server.js                # Punto de entrada servidor
│   ├── package.json             # Dependencias backend
│   └── .env                     # Variables de entorno
│
├── database/                    # Scripts de base de datos
│   ├── marketplus.sql           # Estructura (18 tablas)
│   ├── seed.sql                 # Datos de ejemplo
│   └── DIAGRAMA-ER.md           # Diagrama entidad-relacion (Mermaid)
│
└── README.md                    # Documentacion del proyecto
```

---

## REQUISITOS PREVIOS

- **Node.js** v18 o superior
- **MySQL** v8.0 o superior
- **Angular CLI** v17
- **npm** v9 o superior

---

## INSTALACION PASO A PASO

### 1. BASE DE DATOS

```bash
# Iniciar MySQL
mysql -u root -p

# Ejecutar scripts SQL
source database/marketplus.sql
source database/seed.sql

# Verificar
USE marketplus_db;
SHOW TABLES;
```

### 2. BACKEND

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env

# Editar .env con tus credenciales de MySQL
# DB_PASSWORD=tu_password_aqui
# JWT_SECRET=tu_secreto_super_secreto

# Iniciar servidor
npm run dev

# El backend correra en http://localhost:3000
```

### 3. FRONTEND

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# El frontend correra en http://localhost:2626
```

---

## CREDENCIALES DE PRUEBA

### Administrador
- **Email:** admin@marketplus.pe
- **Password:** 12345678

### Usuario Cliente
- **Email:** carlos.rodriguez@gmail.com
- **Password:** 12345678

---

## API REST - ENDPOINTS

### Autenticacion
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesion | No |
| POST | `/api/auth/forgot-password` | Solicitar recuperacion | No |
| POST | `/api/auth/reset-password` | Restablecer contraseña | No |
| GET | `/api/auth/profile` | Obtener perfil | Si |
| PUT | `/api/auth/profile` | Actualizar perfil | Si |

### Favoritos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/favorites` | Listar favoritos | Si |
| POST | `/api/favorites` | Agregar favorito | Si |
| DELETE | `/api/favorites/:productId` | Quitar favorito | Si |

### Productos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/products` | Listar productos (con filtros) | No |
| GET | `/api/products/destacados` | Productos destacados | No |
| GET | `/api/products/:slug` | Detalle de producto | No |
| POST | `/api/products` | Crear producto | Admin |
| PUT | `/api/products/:id` | Actualizar producto | Admin |
| DELETE | `/api/products/:id` | Eliminar producto | Admin |

### Categorias
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/categories` | Listar categorias | No |
| GET | `/api/categories/admin` | Listar categorias (admin) | Admin |
| POST | `/api/categories` | Crear categoria | Admin |
| PUT | `/api/categories/:id` | Actualizar categoria | Admin |
| DELETE | `/api/categories/:id` | Eliminar categoria | Admin |

### Carrito
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/cart` | Obtener carrito | Si |
| POST | `/api/cart/add` | Agregar producto | Si |
| PUT | `/api/cart/item/:id` | Actualizar cantidad | Si |
| DELETE | `/api/cart/item/:id` | Eliminar item | Si |
| DELETE | `/api/cart/clear` | Vaciar carrito | Si |

### Pedidos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| POST | `/api/orders` | Crear pedido | Si |
| GET | `/api/orders/my-orders` | Mis pedidos | Si |
| GET | `/api/orders/:numero` | Detalle pedido | Si |
| GET | `/api/orders/admin/all` | Todos los pedidos | Admin |
| PUT | `/api/orders/admin/:id/status` | Cambiar estado | Admin |

### Admin
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/admin/dashboard` | Estadisticas dashboard | Admin |
| GET | `/api/admin/users` | Listar usuarios | Admin |
| PUT | `/api/admin/users/:id` | Actualizar usuario | Admin |
| GET | `/api/admin/inventory` | Ver inventario | Admin |
| PUT | `/api/admin/inventory/:id` | Actualizar inventario | Admin |

---

## BASE DE DATOS - DIAGRAMA RELACIONAL

```
roles (1) ────< (N) usuarios
                        │
                        ├──> (N) direcciones
                        ├──> (N) carrito ────< (N) detalle_carrito >─── (N) productos
                        ├──> (N) pedidos ────< (N) detalle_pedido ────> (N) productos
                        │       │
                        │       └──> (N) pagos
                        │       └──> (N) historial_pedidos
                        ├──> (N) valoraciones >─── (N) productos
                        ├──> (N) favoritos >─── (N) productos
                        └──> (N) notificaciones

categorias (1) ────< (N) productos
marcas (1) ────────< (N) productos
proveedores (1) ───< (N) productos
productos (1) ─────< (1) inventario
```

### Relaciones
- **Uno a Muchos:** roles → usuarios, categorias → productos, marcas → productos
- **Muchos a Muchos:** usuarios ↔ productos (via favoritos, valoraciones)
- **Uno a Uno:** productos → inventario

---

## FUNCIONALIDADES

### Usuario Cliente
- [x] Registro e inicio de sesion con JWT
- [x] Recuperar contraseña
- [x] Catalogo con busqueda y filtros
- [x] Detalle de producto con valoraciones
- [x] Carrito de compras
- [x] Checkout con cupones de descuento
- [x] Historial de pedidos
- [x] Perfil de usuario editable
- [x] Lista de favoritos (`/favoritos`)
- [x] Seguimiento de pedidos (`/mis-pedidos/:numero`)

### Administrador
- [x] Dashboard con estadisticas
- [x] CRUD completo de productos
- [x] CRUD de categorias y marcas
- [x] Gestion de usuarios
- [x] Gestion de pedidos (cambiar estados)
- [x] Control de inventario
- [x] Reportes y estadisticas

---

## TECNOLOGIAS USADAS

| Area | Tecnologia |
|------|------------|
| Frontend | Angular 17, TypeScript, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Base de Datos | MySQL 8.0 |
| Autenticacion | JWT (jsonwebtoken), bcrypt |
| Estilos | CSS Grid, Flexbox, CSS Variables, Animaciones |
| HTTP | Angular HttpClient, Axios (backend) |
| Validacion | express-validator |

---

## PRODUCTOS INCLUIDOS (Precios en Soles Peruanos)

| Producto | Precio | Oferta |
|----------|--------|--------|
| Samsung Galaxy S24 Ultra 256GB | S/ 5,499 | S/ 4,899 |
| iPhone 15 Pro Max 256GB | S/ 6,999 | S/ 6,299 |
| Xiaomi Redmi Note 13 Pro 256GB | S/ 1,399 | S/ 1,199 |
| Lenovo Legion 5 Pro RTX 4060 | S/ 5,299 | S/ 4,799 |
| ASUS ROG Strix G16 RTX 4070 | S/ 7,499 | S/ 6,899 |
| MacBook Air M3 15" 256GB | S/ 5,999 | S/ 5,499 |
| AirPods Pro 2da Gen USB-C | S/ 1,199 | S/ 999 |
| Samsung Galaxy Watch 6 Classic | S/ 1,799 | S/ 1,499 |
| Apple Watch Series 9 45mm | S/ 2,199 | S/ 1,899 |
| Samsung Smart TV 55" 4K | S/ 2,499 | S/ 2,199 |

---

## CUPONES DE DESCUENTO

| Codigo | Tipo | Valor | Min. Compra |
|--------|------|-------|-------------|
| TECH2026 | Porcentaje | 10% | S/ 200 |
| GAMING15 | Porcentaje | 15% | S/ 500 |
| ENVIO50 | Fijo | S/ 5 | S/ 100 |
| SAMSUNG20 | Porcentaje | 20% | S/ 1,000 |

---

## LICENCIA

MIT License - Proyecto Universitario MarketPlus 2026
