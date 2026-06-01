USE marketplus_db;

-- Tipo de entrega en direcciones
ALTER TABLE direcciones
    MODIFY COLUMN tipo ENUM('domicilio', 'recojo_tienda', 'envio', 'facturacion', 'ambas') DEFAULT 'domicilio';

UPDATE direcciones SET tipo = 'domicilio' WHERE tipo IN ('envio', 'facturacion', 'ambas');

ALTER TABLE direcciones
    MODIFY COLUMN tipo ENUM('domicilio', 'recojo_tienda') NOT NULL DEFAULT 'domicilio';

ALTER TABLE direcciones
    ADD COLUMN IF NOT EXISTS dni_contacto VARCHAR(8) NULL AFTER telefono;

-- Comprobante y datos de pago en pedidos
ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS tipo_comprobante ENUM('boleta', 'factura') NULL AFTER metodo_pago;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS comprobante_dni VARCHAR(8) NULL AFTER tipo_comprobante;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS comprobante_ruc VARCHAR(11) NULL AFTER comprobante_dni;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS comprobante_razon_social VARCHAR(255) NULL AFTER comprobante_ruc;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS comprobante_direccion_fiscal VARCHAR(255) NULL AFTER comprobante_razon_social;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS datos_pago JSON NULL AFTER comprobante_direccion_fiscal;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS comprobante_nombre VARCHAR(200) NULL AFTER comprobante_direccion_fiscal;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS estado_pago ENUM('pendiente', 'simulado_completado', 'completado', 'fallido') DEFAULT 'simulado_completado' AFTER metodo_pago;

ALTER TABLE pedidos
    ADD COLUMN IF NOT EXISTS es_pago_simulado BOOLEAN DEFAULT TRUE AFTER estado_pago;
