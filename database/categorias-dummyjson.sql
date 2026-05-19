-- Categorías adicionales para catálogo ampliado (DummyJSON)
USE marketplus_db;

INSERT INTO categorias (nombre, slug, descripcion, estado) VALUES
('Tablets', 'tablets', 'Tablets para estudio, trabajo y entretenimiento', 'activo'),
('Gaming y Accesorios', 'gaming', 'Periféricos, controles y accesorios gaming', 'activo'),
('Movilidad Eléctrica', 'movilidad-electrica', 'Scooters y movilidad urbana eléctrica', 'activo')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), descripcion = VALUES(descripcion), estado = 'activo';

UPDATE categorias SET estado = 'activo' WHERE slug IN (
    'celulares-smartphones', 'laptops-computadoras', 'refrigeradoras',
    'accesorios', 'auriculares-audio', 'tablets', 'smartwatch-wearables', 'gaming', 'movilidad-electrica'
);
