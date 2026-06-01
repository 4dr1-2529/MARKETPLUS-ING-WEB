# Guia de Sustentacion - MarketPlus

## Explicacion Corta del Proyecto
MarketPlus es una tienda online de productos tecnologicos con frontend Angular y backend Node.js/Express. Permite registro/login, catalogo, carrito, checkout, pedidos, seguimiento y panel administrativo.

## Explicacion de Arquitectura
- **Frontend**: Angular 17, rutas protegidas, servicios HTTP e interceptor JWT.
- **Backend**: Express REST API con middleware de autenticacion y autorizacion por rol.
- **Base de datos**: MySQL relacional con 18 tablas, claves foraneas y normalizacion hasta 3FN.
- **Integracion**: frontend consume `/api/*` y backend opera sobre `marketplus_db`.

## Explicacion de Frontend
- Modulos principales: login, registro, catalogo, detalle, carrito, checkout, pedidos y administracion.
- Servicios por dominio: `auth`, `products`, `cart`, `orders`, `admin`, `reviews`, `addresses`, `coupons`.
- Validaciones implementadas en formularios y feedback con toasts/mensajes.

## Explicacion de Backend
- Endpoints principales:
  - `auth`: registro, login, perfil, recuperacion/cambio de contraseña.
  - `products/categories/brands`: consulta y gestion administrativa.
  - `cart/orders`: flujo transaccional de compra.
  - `admin`: dashboard, usuarios, inventario, reportes.
  - `reviews/favorites/notifications/coupons`: funcionalidades complementarias.
- Respuestas JSON consistentes con estructura `success`, `message`, `data`.

## Explicacion de Base de Datos
- Tablas nucleares: `usuarios`, `productos`, `pedidos`, `detalle_pedido`, `pagos`, `direcciones`.
- Integridad: PK/FK, indices y restricciones de dominio.
- Soporte analitico: vistas de ventas, stock bajo y productos populares.
- Procedimiento `sp_crear_pedido` para consolidar pedido en transaccion.

## Explicacion de Git
- Uso de commits por tarea y push continuo a GitHub.
- Evidencias: historial de commits, ramas y cambios por modulo.
- Documentacion de versionado en `GESTION_VERSIONES.md`.

## Posibles Preguntas del Docente (con Respuestas)
1. **Por que eligieron arquitectura cliente-servidor?**  
   Porque separa responsabilidades: Angular para experiencia de usuario y Express para reglas de negocio/API.

2. **Como aseguran seguridad basica?**  
   JWT en endpoints protegidos, hashing de contraseñas con bcrypt y validaciones de entrada.

3. **Como garantizan integridad de datos?**  
   Claves foraneas, restricciones, transacciones en pedidos e indices para consultas.

4. **Como prueban que el sistema funciona?**  
   Pruebas manuales por flujo: auth, catalogo, carrito, checkout, pedidos y panel admin.

5. **Como manejan cambios en equipo?**  
   Git con ramas, commits descriptivos y sincronizacion por repositorio remoto.

## Advertencia Sobre Angular 17 vs Rubrica Angular 21
Si la rubrica menciona Angular 21, puedes defender asi:
- La version usada (Angular 17) es estable, vigente y totalmente compatible con los criterios funcionales evaluados.
- La evaluacion se centra en arquitectura, calidad, integracion y cumplimiento de funcionalidades, no solo en version numerica.
- El proyecto mantiene buenas practicas de Angular (modularidad, servicios, rutas, interceptor, validaciones) y puede migrarse a versiones superiores como mejora futura controlada.
