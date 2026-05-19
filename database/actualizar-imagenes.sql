-- Actualizar imágenes: usar CDN confiable (DummyJSON / Pexels vía frontend)
-- Vacía URLs de Unsplash rotas; el frontend resuelve por slug
USE marketplus_db;

UPDATE productos SET imagen_principal = NULL WHERE imagen_principal LIKE '%unsplash.com%';

-- Auriculares y accesorios sin imagen: el mapa del frontend los completa
UPDATE productos SET imagen_principal = NULL
WHERE slug IN (
    'adaptador-usbc-hdmi',
    'airpods-pro-2-usbc', 'samsung-galaxy-buds3-pro', 'jbl-tune-770nc-bluetooth',
    'sony-wh-1000xm5', 'jbl-wave-beam-2', 'airpods-4', 'samsung-galaxy-buds-fe',
    'xiaomi-redmi-buds-5-pro', 'sony-linkbuds-s'
);

SELECT c.slug AS categoria, p.slug, 
       CASE WHEN p.imagen_principal IS NULL OR p.imagen_principal = '' THEN 'frontend' ELSE 'bd' END AS origen
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.estado = 'activo'
ORDER BY c.slug, p.nombre;
