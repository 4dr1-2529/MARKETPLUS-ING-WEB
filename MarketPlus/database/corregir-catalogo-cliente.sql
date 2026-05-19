-- Correcciones: quitar movilidad, gaming deportivo, imágenes refrigeradoras
USE marketplus_db;

-- Desactivar movilidad eléctrica y gaming mal categorizado (deportes)
UPDATE categorias SET estado = 'inactivo' WHERE slug IN ('movilidad-electrica', 'gaming');

UPDATE productos SET estado = 'inactivo'
WHERE categoria_id IN (SELECT id FROM categorias WHERE slug IN ('movilidad-electrica', 'gaming'));

-- Imágenes reales de refrigeradoras (Unsplash - electrodomésticos)
UPDATE productos p
JOIN categorias c ON p.categoria_id = c.id
SET p.imagen_principal = CASE p.slug
    WHEN 'refrigeradora-samsung-rt38-400l' THEN 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop'
    WHEN 'refrigeradora-lg-door-in-door-430l' THEN 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop'
    WHEN 'refrigeradora-mabe-rms400' THEN 'https://images.unsplash.com/photo-1626804475297-41608ea09eca?w=600&h=600&fit=crop'
    WHEN 'refrigeradora-indurama-fr-450' THEN 'https://images.unsplash.com/photo-1631545259747-c1e39a88a59a?w=600&h=600&fit=crop'
    WHEN 'refrigeradora-samsung-french-door-530l' THEN 'https://images.unsplash.com/photo-1631889992176-688e8ba314e3?w=600&h=600&fit=crop'
    WHEN 'refrigeradora-lg-linear-420l' THEN 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=80'
    WHEN 'refrigeradora-bosch-serie-4-360l' THEN 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop&q=80'
    WHEN 'refrigeradora-mabe-top-mount-320l' THEN 'https://images.unsplash.com/photo-1626804475297-41608ea09eca?w=600&h=600&fit=crop&q=80'
    WHEN 'refrigeradora-samsung-side-by-side-600l' THEN 'https://images.unsplash.com/photo-1631889992176-688e8ba314e3?w=600&h=600&fit=crop&q=80'
    WHEN 'refrigeradora-lg-combi-380l' THEN 'https://images.unsplash.com/photo-1631545259747-c1e39a88a59a?w=600&h=600&fit=crop&q=80'
    ELSE p.imagen_principal
END
WHERE c.slug = 'refrigeradoras' AND p.estado = 'activo';

SELECT c.nombre, COUNT(*) AS productos FROM categorias c
LEFT JOIN productos p ON p.categoria_id = c.id AND p.estado = 'activo'
WHERE c.estado = 'activo' GROUP BY c.id ORDER BY productos DESC;
