# INFORME DE INGENIERIA WEB - UNIDAD 3

## Portada
- Curso: Ingenieria Web
- Unidad: Unidad 3
- Proyecto: MarketPlus - Tienda Online de Productos Tecnologicos
- Integrantes: [COMPLETAR]
- Docente: [COMPLETAR]
- Fecha: [COMPLETAR]

## Indice
1. Propuesta de proyecto
2. Descripcion del proyecto
3. Proposito
4. Contexto del problema
5. Publico objetivo
6. Objetivo general
7. Objetivos especificos
8. Arquitectura de la aplicacion web
9. Beneficios y limitaciones
10. Mapa de navegacion
11. Prototipos
12. Base de datos
13. Modelo relacional
14. Normalizacion hasta 3FN
15. Desarrollo de la aplicacion web
16. Herramientas utilizadas
17. Gestion de versiones
18. Capturas requeridas
19. Conclusiones
20. Recomendaciones
21. Bibliografia (IEEE)
22. Anexos

## Propuesta de Proyecto
Desarrollar una plataforma e-commerce llamada MarketPlus para gestionar la venta online de productos tecnologicos, incluyendo catalogo, carrito, checkout, seguimiento de pedidos y panel administrativo.

## Descripcion del Proyecto
MarketPlus implementa un sistema web full stack con Angular para la capa de presentacion, Express para la API REST y MySQL para persistencia relacional. Incluye autenticacion JWT, control de inventario y reportes administrativos.

## Proposito
Ofrecer una solucion web escalable y mantenible para compras online, priorizando usabilidad, integridad de datos y trazabilidad de operaciones.

## Contexto del Problema
Los comercios tecnologicos requieren canales digitales para ventas 24/7, control de stock y seguimiento de pedidos. Muchas soluciones pequeñas no integran correctamente frontend, backend y base de datos.

## Publico Objetivo
- Clientes que compran productos tecnologicos.
- Administradores que gestionan catalogo, usuarios e inventario.

## Objetivo General
Implementar una aplicacion web funcional de comercio electronico que cumpla criterios tecnicos de frontend, backend, base de datos y gestion de versiones.

## Objetivos Especificos
- Implementar autenticacion y autorizacion por roles.
- Permitir navegacion de catalogo y detalle de productos.
- Gestionar carrito, checkout y pedidos.
- Proveer panel administrativo para operaciones clave.
- Disenar base de datos normalizada hasta 3FN.
- Mantener control de cambios mediante Git y GitHub.

## Arquitectura de la Aplicacion Web
- **Frontend**: Angular 17 (SPA, routing, servicios HTTP, interceptor JWT).
- **Backend**: Node.js + Express (API REST y reglas de negocio).
- **Base de datos**: MySQL 8.0 (modelo relacional con PK/FK).
- **Comunicacion**: HTTP JSON sobre `/api/*`.

## Beneficios y Limitaciones
### Beneficios
- Arquitectura separada por capas.
- Flujo de compra completo.
- Integridad de datos mediante relaciones y restricciones.
- Escalable por modularidad de servicios/rutas.

### Limitaciones
- Pruebas automatizadas aun limitadas.
- Algunas mejoras UX/responsive pueden ampliarse en siguientes iteraciones.

## Mapa de Navegacion
- Publico: Inicio, Catalogo, Detalle, Login, Registro.
- Privado usuario: Carrito, Checkout, Mis pedidos, Favoritos, Direcciones.
- Admin: Dashboard, Productos, Categorias, Marcas, Usuarios, Pedidos, Inventario, Reportes.

## Prototipos
- Se implementaron vistas finales en Angular como prototipo funcional.
- Referencias visuales: pantallas de autenticacion, catalogo, checkout y panel admin.

## Base de Datos
La base `marketplus_db` posee 18 tablas para roles, usuarios, catalogo, transacciones y notificaciones. Ver `DOCUMENTACION_BASE_DATOS.md`.

## Modelo Relacional
Relaciones principales:
- `usuarios` 1:N `pedidos`
- `pedidos` 1:N `detalle_pedido`
- `productos` 1:1 `inventario`
- `usuarios` N:M `productos` via `favoritos` y `valoraciones`

## Normalizacion hasta 3FN
- 1FN: atributos atomicos.
- 2FN: dependencia completa de la clave en tablas de detalle.
- 3FN: eliminacion de dependencias transitivas por separacion en entidades (roles, categorias, marcas, proveedores).
- Denormalizaciones controladas: contadores de `ventas`/`visitas` y totales de pedido para rendimiento.

## Desarrollo de la Aplicacion Web
- Se implementaron y ajustaron modulos de frontend, backend y BD.
- Se corrigieron inconsistencias de puertos, endpoints y contratos API.
- Se agregaron mejoras de validacion y coherencia documental para entrega.

## Herramientas Utilizadas
- Angular 17
- Node.js + Express
- MySQL 8.0
- Git y GitHub
- Visual Studio Code / Cursor

## Gestion de Versiones
Se utilizo Git para trazabilidad de cambios y sincronizacion con repositorio remoto. Ver detalle en `GESTION_VERSIONES.md`.

## Capturas Requeridas
[CAPTURA: Login]  
[CAPTURA: Registro]  
[CAPTURA: Catalogo]  
[CAPTURA: Carrito]  
[CAPTURA: Checkout]  
[CAPTURA: Panel Administrador]  
[CAPTURA: Base de datos]  
[CAPTURA: GitHub commits]

## Conclusiones
- El proyecto integra correctamente frontend, backend y base de datos para un flujo e-commerce completo.
- Se alcanzan funcionalidades clave exigidas por la unidad y base tecnica para nivel excelente.
- La documentacion permite sustentar decisiones tecnicas y operativas.

## Recomendaciones
- Agregar pruebas automatizadas (unitarias/integracion).
- Incorporar pipeline CI para validacion en cada push.
- Fortalecer monitoreo y auditoria de seguridad.

## Bibliografia (Formato IEEE)
- [1] Angular Team, "Angular Documentation," [Online]. Available: https://angular.dev/docs.
- [2] Express.js, "Express - Node.js web application framework," [Online]. Available: https://expressjs.com/.
- [3] Oracle, "MySQL 8.0 Reference Manual," [Online]. Available: https://dev.mysql.com/doc/.
- [4] Atlassian, "Git Tutorials," [Online]. Available: https://www.atlassian.com/git/tutorials.

## Anexos
- Scripts SQL: `database/marketplus.sql`, `database/seed.sql`, `database/views.sql`, `database/procedures.sql`.
- Diagrama ER: `database/DIAGRAMA-ER.md`.
- Guias de instalacion y sustentacion: `INSTALACION.md`, `GUIA_SUSTENTACION.md`.
