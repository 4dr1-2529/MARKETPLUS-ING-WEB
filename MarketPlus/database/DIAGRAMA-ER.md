# MARKETPLUS - Diagrama Entidad-Relación

Base de datos: **marketplus_db** | Motor: **MySQL 8.0** | Tablas: **18**

## Diagrama Mermaid

```mermaid
erDiagram
    roles ||--o{ usuarios : tiene
    usuarios ||--o{ direcciones : tiene
    usuarios ||--o| carrito : posee
    carrito ||--o{ detalle_carrito : contiene
    productos ||--o{ detalle_carrito : incluido_en
    usuarios ||--o{ pedidos : realiza
    pedidos ||--o{ detalle_pedido : contiene
    productos ||--o{ detalle_pedido : incluido_en
    pedidos ||--o{ pagos : tiene
    pedidos ||--o{ historial_pedidos : registra
    usuarios ||--o{ valoraciones : escribe
    productos ||--o{ valoraciones : recibe
    usuarios ||--o{ favoritos : guarda
    productos ||--o{ favoritos : es_favorito
    usuarios ||--o{ notificaciones : recibe
    categorias ||--o{ productos : agrupa
    marcas ||--o{ productos : fabrica
    proveedores ||--o{ productos : suministra
    productos ||--|| inventario : controla
    categorias ||--o{ categorias : padre_hijo

    roles {
        int id PK
        varchar nombre UK
    }
    usuarios {
        int id PK
        int role_id FK
        varchar email UK
        varchar password
    }
    productos {
        int id PK
        int categoria_id FK
        int marca_id FK
        decimal precio
        varchar slug UK
    }
    pedidos {
        int id PK
        varchar numero_pedido UK
        enum estado
        decimal total
    }
```

## Relaciones

| Tipo | Relación | Descripción |
|------|----------|-------------|
| 1:N | roles → usuarios | Un rol tiene muchos usuarios |
| 1:N | categorias → productos | Una categoría agrupa muchos productos |
| 1:N | marcas → productos | Una marca tiene muchos productos |
| 1:N | proveedores → productos | Un proveedor suministra muchos productos |
| 1:1 | productos → inventario | Cada producto tiene un registro de stock |
| 1:N | usuarios → pedidos | Un usuario realiza muchos pedidos |
| 1:N | pedidos → detalle_pedido | Un pedido tiene muchos ítems |
| 1:N | pedidos → pagos | Un pedido puede tener pagos asociados |
| 1:N | pedidos → historial_pedidos | Trazabilidad de cambios de estado |
| N:M | usuarios ↔ productos | Via tabla **favoritos** |
| N:M | usuarios ↔ productos | Via tabla **valoraciones** |
| 1:N | carrito → detalle_carrito | Items del carrito activo |

## Tablas del sistema

1. roles
2. usuarios
3. categorias
4. marcas
5. proveedores
6. productos
7. inventario
8. direcciones
9. carrito
10. detalle_carrito
11. pedidos
12. detalle_pedido
13. pagos
14. cupones
15. valoraciones
16. favoritos
17. historial_pedidos
18. notificaciones
