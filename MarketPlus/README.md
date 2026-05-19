# MarketPlus - Tienda Online de Productos Tecnologicos

> Proyecto Universitario - Aplicacion Web Full Stack Moderna y Profesional

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

## Descripcion

MarketPlus es una tienda online completa de productos tecnologicos, desarrollada con Angular 17 en el frontend y Node.js + Express en el backend, con base de datos MySQL. Incluye sistema de autenticacion JWT, carrito de compras, gestion de pedidos, panel de administracion y mucho mas.

## Caracteristicas Principales

### Usuario
- Registro e inicio de sesion con JWT
- Recuperacion y cambio de contraseña
- Catalogo de productos con busqueda y filtros
- Carrito de compras
- Lista de favoritos
- Gestion de direcciones de envio
- Checkout con cupones de descuento
- Historial de pedidos y seguimiento
- Valoraciones y reseñas de productos
- Notificaciones en tiempo real

### Administrador
- Dashboard con estadisticas en tiempo real
- CRUD completo de productos, categorias y marcas
- Gestion de usuarios
- Control de inventario
- Gestion de pedidos y estados
- Reportes y estadisticas avanzadas
- Top clientes y productos mas vendidos
- Alertas de stock bajo

## Estructura del Proyecto

```
MarketPlus/
├── frontend/                   # Aplicacion Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   ├── pages/          # Paginas principales
│   │   │   │   ├── admin/      # Panel de administracion
│   │   │   │   ├── addresses/  # Gestion de direcciones
│   │   │   │   ├── coupons/    # Cupones disponibles
│   │   │   │   ├── notifications/ # Notificaciones
│   │   │   │   ├── reviews/    # Reseñas de productos
│   │   │   │   └── ...
│   │   │   ├── services/       # Servicios HTTP
│   │   │   ├── models/         # Interfaces TypeScript
│   │   │   ├── guards/         # Guards de autenticacion
│   │   │   ├── interceptors/   # Interceptores HTTP
│   │   │   ├── pipes/          # Pipes personalizados
│   │   │   └── shared/         # Modulo compartido
│   │   ├── assets/             # Recursos estaticos
│   │   └── environments/       # Configuraciones de entorno
│   └── package.json
│
├── backend/                    # API REST Node.js
│   ├── config/                 # Configuracion de base de datos
│   ├── controllers/            # Controladores de rutas
│   ├── middleware/             # Middleware (auth, validaciones)
│   ├── routes/                 # Definicion de rutas API
│   ├── services/               # Servicios auxiliares
│   ├── utils/                  # Utilidades y helpers
│   ├── uploads/                # Archivos subidos
│   ├── app.js                  # Configuracion de Express
│   ├── server.js               # Punto de entrada
│   └── .env                    # Variables de entorno
│
├── database/                   # Scripts de base de datos
│   ├── marketplus.sql          # Estructura completa (18 tablas)
│   ├── seed.sql                # Datos de ejemplo
│   ├── views.sql               # Vistas personalizadas
│   └── procedures.sql          # Procedimientos almacenados
│
└── README.md
```

## Base de Datos

### Tablas (18)

| # | Tabla | Descripcion |
|---|-------|-------------|
| 1 | roles | Roles de usuario (admin, usuario) |
| 2 | usuarios | Usuarios registrados |
| 3 | categorias | Categorias de productos |
| 4 | marcas | Marcas de productos |
| 5 | proveedores | Proveedores de productos |
| 6 | productos | Catalogo de productos |
| 7 | inventario | Control de stock |
| 8 | direcciones | Direcciones de envio |
| 9 | carrito | Carrito de compras |
| 10 | detalle_carrito | Items del carrito |
| 11 | pedidos | Ordenes de compra |
| 12 | detalle_pedido | Items del pedido |
| 13 | pagos | Historial de pagos |
| 14 | cupones | Cupones de descuento |
| 15 | valoraciones | Reseñas y calificaciones |
| 16 | favoritos | Lista de deseos |
| 17 | historial_pedidos | Seguimiento de pedidos |
| 18 | notificaciones | Notificaciones del sistema |

## Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework web
- **TypeScript 5** - Tipado estatico
- **RxJS** - Programacion reactiva
- **CSS3** - Diseño moderno con variables CSS
- **Angular Animations** - Animaciones suaves
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Entorno de ejecucion
- **Express.js** - Framework web
- **MySQL 8.0** - Base de datos relacional
- **JWT** - Autenticacion
- **bcrypt** - Encriptacion de contraseñas
- **express-rate-limit** - Proteccion contra abuso
- **express-validator** - Validacion de datos
- **multer** - Subida de archivos
- **morgan** - Logging de requests

## Instalacion y Configuracion

### Requisitos Previos
- Node.js >= 18.0.0
- MySQL >= 8.0
- npm >= 9.0.0

### Paso 1: Clonar el repositorio
```bash
git clone <repository-url>
cd MarketPlus
```

### Paso 2: Configurar la Base de Datos
```bash
# Iniciar MySQL
mysql -u root -p

# Crear base de datos y tablas
source database/marketplus.sql

# Cargar datos de ejemplo
source database/seed.sql
```

### Paso 3: Configurar el Backend
```bash
cd backend
npm install

# Configurar variables de entorno
# Editar .env con tus credenciales de MySQL
cp .env.example .env
```

**Archivo .env:**
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=marketplus_db
JWT_SECRET=tu_secreto_super_secreto
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:2626
NODE_ENV=development
```

### Paso 4: Configurar el Frontend
```bash
cd frontend
npm install
```

### Paso 5: Ejecutar la Aplicacion

**Opcion 1: Ejecutar por separado**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
ng serve --port 2626
```

**Opcion 2: Ejecutar simultaneamente (desde la raiz)**
```bash
npm install
npm run dev
```

### Acceder a la Aplicacion
- **Frontend:** http://localhost:2626
- **Backend API:** http://localhost:3000/api

## Credenciales de Prueba

### Administrador
- **Email:** admin@marketplus.com
- **Contraseña:** 12345678

### Usuario
- **Email:** usuario@marketplus.com
- **Contraseña:** 12345678

## API REST Endpoints

### Autenticacion
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Inicio de sesion | No |
| POST | `/api/auth/forgot-password` | Recuperar contraseña | No |
| POST | `/api/auth/reset-password` | Restablecer contraseña | No |
| GET | `/api/auth/profile` | Obtener perfil | Si |
| PUT | `/api/auth/profile` | Actualizar perfil | Si |
| PUT | `/api/auth/change-password` | Cambiar contraseña | Si |

### Productos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/products` | Listar productos | No |
| GET | `/api/products/destacados` | Productos destacados | No |
| GET | `/api/products/:slug` | Detalle de producto | No |
| POST | `/api/products` | Crear producto | Admin |
| PUT | `/api/products/:id` | Actualizar producto | Admin |
| DELETE | `/api/products/:id` | Eliminar producto | Admin |

### Carrito
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/cart` | Obtener carrito | Si |
| POST | `/api/cart/add` | Agregar item | Si |
| PUT | `/api/cart/item/:id` | Actualizar cantidad | Si |
| DELETE | `/api/cart/item/:id` | Eliminar item | Si |
| DELETE | `/api/cart/clear` | Vaciar carrito | Si |

### Pedidos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| POST | `/api/orders` | Crear pedido | Si |
| GET | `/api/orders/my-orders` | Mis pedidos | Si |
| GET | `/api/orders/:numero` | Detalle de pedido | Si |
| GET | `/api/orders` | Todos los pedidos | Admin |
| PUT | `/api/orders/:id/status` | Actualizar estado | Admin |

### Direcciones
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/addresses` | Listar direcciones | Si |
| POST | `/api/addresses` | Crear direccion | Si |
| PUT | `/api/addresses/:id` | Actualizar direccion | Si |
| DELETE | `/api/addresses/:id` | Eliminar direccion | Si |
| PUT | `/api/addresses/:id/primary` | Establecer como principal | Si |

### Valoraciones
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/reviews/product/:id` | Reviews de producto | No |
| POST | `/api/reviews` | Crear review | Si |
| GET | `/api/reviews/my-review/:id` | Mi review | Si |
| DELETE | `/api/reviews/:id` | Eliminar review | Si |

### Notificaciones
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/notifications` | Listar notificaciones | Si |
| GET | `/api/notifications/unread-count` | Contador no leidas | Si |
| PUT | `/api/notifications/:id/read` | Marcar como leida | Si |
| PUT | `/api/notifications/read-all` | Marcar todas leidas | Si |
| DELETE | `/api/notifications/:id` | Eliminar notificacion | Si |

### Cupones
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/coupons` | Listar cupones activos | No |
| POST | `/api/coupons/validate` | Validar cupon | Si |

### Favoritos
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/favorites` | Mis favoritos | Si |
| POST | `/api/favorites` | Agregar favorito | Si |
| DELETE | `/api/favorites/:id` | Eliminar favorito | Si |

### Admin
| Metodo | Ruta | Descripcion | Auth |
|--------|------|-------------|------|
| GET | `/api/admin/dashboard` | Dashboard stats | Admin |
| GET | `/api/admin/reports` | Reportes avanzados | Admin |
| GET | `/api/admin/users` | Listar usuarios | Admin |
| PUT | `/api/admin/users/:id` | Actualizar usuario | Admin |
| GET | `/api/admin/inventory` | Inventario | Admin |
| PUT | `/api/admin/inventory/:id` | Actualizar inventario | Admin |

## Capturas de Pantalla

### Pagina Principal
- Hero section con productos destacados
- Categorias populares
- Ofertas especiales
- Productos mas vendidos

### Panel de Administracion
- Dashboard con metricas en tiempo real
- Graficos de ventas
- Gestion completa de productos
- Control de inventario
- Reportes avanzados

## Caracteristicas de Diseño

- **Responsive:** Compatible con PC, tablet y movil
- **Tema Claro/Oscuro:** Toggle de tema
- **Animaciones:** Transiciones suaves y efectos hover
- **Componentes Reutilizables:** Cards, modales, loaders, toasts
- **CSS Grid y Flexbox:** Layout moderno
- **Variables CSS:** Sistema de diseño consistente
- **Google Material Icons:** Iconografia profesional

## Seguridad

- Autenticacion con JWT tokens
- Contraseñas encriptadas con bcrypt
- Validacion de datos en backend
- Rate limiting para prevenir abuso
- CORS configurado
- Proteccion contra SQL injection (prepared statements)

## Buenas Practicas Implementadas

- Separacion de responsabilidades (MVC)
- Servicios inyectables en Angular
- Guards para proteccion de rutas
- Interceptores para tokens JWT
- Interfaces TypeScript para tipado fuerte
- Manejo de errores centralizado
- Transacciones de base de datos
- Indices en tablas para optimizacion
- Código limpio y documentado

## Autor

**MarketPlus** - Proyecto Universitario

## Licencia

MIT License

---

> Desarrollado con Angular 17, Node.js, Express y MySQL
