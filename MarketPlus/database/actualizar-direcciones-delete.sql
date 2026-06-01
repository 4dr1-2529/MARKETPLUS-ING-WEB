-- Permite eliminar direcciones aunque existan pedidos historicos (FK SET NULL)
USE marketplus_db;

SET @fk_name := (
    SELECT CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'pedidos'
      AND COLUMN_NAME = 'direccion_envio_id'
      AND REFERENCED_TABLE_NAME = 'direcciones'
    LIMIT 1
);

SET @drop_sql := IF(@fk_name IS NOT NULL, CONCAT('ALTER TABLE pedidos DROP FOREIGN KEY `', @fk_name, '`'), 'SELECT 1');
PREPARE stmt FROM @drop_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

ALTER TABLE pedidos MODIFY COLUMN direccion_envio_id INT NULL;

ALTER TABLE pedidos
    ADD CONSTRAINT fk_pedidos_direccion_envio
    FOREIGN KEY (direccion_envio_id) REFERENCES direcciones(id) ON DELETE SET NULL;
