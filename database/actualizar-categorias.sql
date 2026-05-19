-- Actualiza descripciones e imágenes de portada de las 20 categorías activas
USE marketplus_db;

UPDATE categorias SET
  descripcion = 'Smartphones de todas las marcas: Samsung, Apple, Xiaomi y más.',
  imagen = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=85'
WHERE slug = 'celulares';

UPDATE categorias SET
  descripcion = 'Laptops para trabajo, estudio y gaming con garantía oficial.',
  imagen = 'https://images.unsplash.com/photo-1496181133206-80ce9d88ed3f?w=400&h=400&fit=crop&q=85'
WHERE slug = 'laptops';

UPDATE categorias SET
  descripcion = 'PC de escritorio, torres y all-in-one para oficina y hogar.',
  imagen = 'https://images.unsplash.com/photo-1593640408188-32a94ec92666?w=400&h=400&fit=crop&q=85'
WHERE slug = 'computadoras-escritorio';

UPDATE categorias SET
  descripcion = 'Tablets iPad, Samsung Galaxy Tab y más para estudio y entretenimiento.',
  imagen = 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&q=85'
WHERE slug = 'tablets';

UPDATE categorias SET
  descripcion = 'Smartwatches Apple Watch, Samsung Galaxy Watch, Garmin y más.',
  imagen = 'https://images.unsplash.com/photo-1579586337278-14ef9ba3e74?w=400&h=400&fit=crop&q=85'
WHERE slug = 'smartwatches';

UPDATE categorias SET
  descripcion = 'Audífonos inalámbricos, headsets gaming y cancelación de ruido.',
  imagen = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=85'
WHERE slug = 'audifonos-headsets';

UPDATE categorias SET
  descripcion = 'Sillas gamer, pads, volantes y accesorios para gamers.',
  imagen = 'https://images.unsplash.com/photo-1542754001-054310fdf0d8?w=400&h=400&fit=crop&q=85'
WHERE slug = 'accesorios-gamer';

UPDATE categorias SET
  descripcion = 'Monitores gaming, 4K y profesionales de 24" a 34".',
  imagen = 'https://images.unsplash.com/photo-1527443224750-6a7d75ad60e3?w=400&h=400&fit=crop&q=85'
WHERE slug = 'monitores';

UPDATE categorias SET
  descripcion = 'Teclados mecánicos, inalámbricos y mouse ergonómicos.',
  imagen = 'https://images.unsplash.com/photo-1587821741240-408b74009126?w=400&h=400&fit=crop&q=85'
WHERE slug = 'teclados-mouse';

UPDATE categorias SET
  descripcion = 'Impresoras láser, multifunción e inyección de tinta.',
  imagen = 'https://images.unsplash.com/photo-1612815161163-62d8d4f32d77?w=400&h=400&fit=crop&q=85'
WHERE slug = 'impresoras';

UPDATE categorias SET
  descripcion = 'Cámaras mirrorless, DSLR, GoPro y lentes.',
  imagen = 'https://images.unsplash.com/photo-1516035069371-29a1b244b170?w=400&h=400&fit=crop&q=85'
WHERE slug = 'camaras-fotografia';

UPDATE categorias SET
  descripcion = 'Parlantes Bluetooth, soundbars y sistemas de audio.',
  imagen = 'https://images.unsplash.com/photo-1608043150317-13ca8ea6fe2d?w=400&h=400&fit=crop&q=85'
WHERE slug = 'parlantes-audio';

UPDATE categorias SET
  descripcion = 'Procesadores, tarjetas gráficas, RAM y placas madre.',
  imagen = 'https://images.unsplash.com/photo-1591488320468-85cadab15d8a?w=400&h=400&fit=crop&q=85'
WHERE slug = 'componentes-pc';

UPDATE categorias SET
  descripcion = 'SSD, HDD y unidades externas de alta velocidad.',
  imagen = 'https://images.unsplash.com/photo-1531495744977-48731882d525?w=400&h=400&fit=crop&q=85'
WHERE slug = 'almacenamiento';

UPDATE categorias SET
  descripcion = 'Routers WiFi 6, mesh y repetidores para el hogar.',
  imagen = 'https://images.unsplash.com/photo-1558494948-ccd52fc86190?w=400&h=400&fit=crop&q=85'
WHERE slug = 'redes-wifi';

UPDATE categorias SET
  descripcion = 'PlayStation, Xbox, Nintendo Switch y videojuegos.',
  imagen = 'https://images.unsplash.com/photo-1606144043849-7c77c2b73c2e?w=400&h=400&fit=crop&q=85'
WHERE slug = 'consolas-videojuegos';

UPDATE categorias SET
  descripcion = 'Smart TV 4K, OLED y QLED de Samsung, LG, Sony y más.',
  imagen = 'https://images.unsplash.com/photo-1593359624479-15d47a30958d?w=400&h=400&fit=crop&q=85'
WHERE slug = 'smart-tv';

UPDATE categorias SET
  descripcion = 'Alexa, Google Home, cámaras y automatización del hogar.',
  imagen = 'https://images.unsplash.com/photo-1558086314-d4cf2c05f961?w=400&h=400&fit=crop&q=85'
WHERE slug = 'hogar-inteligente';

UPDATE categorias SET
  descripcion = 'Cargadores rápidos, power banks y cables certificados.',
  imagen = 'https://images.unsplash.com/photo-1609091833634-396883dcd47e?w=400&h=400&fit=crop&q=85'
WHERE slug = 'cargadores-powerbanks';

UPDATE categorias SET
  descripcion = 'Fundas, protectores, cables y accesorios para tu celular.',
  imagen = 'https://images.unsplash.com/photo-1601784551446-20c6212fdf03?w=400&h=400&fit=crop&q=85'
WHERE slug = 'accesorios-celulares';
