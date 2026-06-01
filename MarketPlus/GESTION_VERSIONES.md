# Gestion de Versiones - MarketPlus

## Uso de Git
- Se utiliza Git para trazabilidad de cambios en frontend, backend, base de datos y documentacion.
- Recomendacion: commits pequenos, descriptivos y enfocados en una sola mejora.
- Convencion sugerida de mensajes:
  - `feat: ...` nuevas funcionalidades.
  - `fix: ...` correcciones.
  - `docs: ...` documentacion.
  - `refactor: ...` reorganizacion sin cambiar comportamiento.

## Ramas Sugeridas
- `master` o `main`: rama estable de entrega.
- `develop`: integracion de trabajo diario.
- `feature/*`: nuevas funcionalidades (ej. `feature/checkout-cupones`).
- `fix/*`: correcciones puntuales (ej. `fix/reviews-endpoint`).
- `docs/*`: actualizaciones del informe y guias.

## Commits Recomendados
- Un commit por tarea valida de la rubrica.
- Incluir contexto funcional y tecnico:
  - `fix(frontend): alinear endpoint de cupones con backend`
  - `fix(db): corregir variable de pedido en procedimiento almacenado`
  - `docs(informe): completar secciones Unidad 3`

## Estructura del Repositorio
- `MarketPlus/frontend`: aplicacion Angular.
- `MarketPlus/backend`: API Node.js/Express.
- `MarketPlus/database`: scripts SQL (modelo, seed, vistas, procedimientos).
- `MarketPlus/*.md`: documentacion tecnica, instalacion e informe.

## Evidencias para Capturar (Informe)
- Historial de commits (`git log --oneline`).
- Evidencia de ramas (`git branch -a`).
- Pantalla de ultimo push en GitHub.
- Comparacion de commits en PR o historial del repositorio.
- Captura de archivos clave modificados por modulo (frontend/backend/db/docs).

## Buenas Practicas para Defender en Sustentacion
- Cada commit debe resolver un problema verificable.
- No mezclar cambios funcionales y documentales en el mismo commit si no estan relacionados.
- Probar antes de hacer push (frontend build, API activa y flujo principal).
- Mantener sincronizado README/INSTALACION con puertos y rutas reales del proyecto.
