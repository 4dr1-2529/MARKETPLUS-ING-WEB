-- =============================================
-- MARKETPLUS - PROCEDIMIENTOS ALMACENADOS
-- =============================================

USE marketplus_db;

DELIMITER //

CREATE PROCEDURE sp_crear_pedido(
    IN p_usuario_id INT,
    IN p_direccion_id INT,
    IN p_metodo_pago VARCHAR(50),
    IN p_cupon_codigo VARCHAR(50),
    IN p_notas TEXT
)
BEGIN
    DECLARE v_carrito_id INT;
    DECLARE v_subtotal DECIMAL(10,2);
    DECLARE v_descuento DECIMAL(10,2) DEFAULT 0;
    DECLARE v_igv DECIMAL(10,2);
    DECLARE v_costo_envio DECIMAL(10,2);
    DECLARE v_total DECIMAL(10,2);
    DECLARE v_numero_pedido VARCHAR(50);
    DECLARE v_pedido_id INT;
    DECLARE v_item_id INT;
    DECLARE v_producto_id INT;
    DECLARE v_cantidad INT;
    DECLARE v_precio DECIMAL(10,2);
    DECLARE v_subtotal_item DECIMAL(10,2);
    DECLARE v_done INT DEFAULT 0;

    DECLARE cur_items CURSOR FOR
        SELECT dc.id, dc.producto_id, dc.cantidad, dc.precio_unitario
        FROM detalle_carrito dc
        JOIN carrito c ON dc.carrito_id = c.id
        WHERE c.usuario_id = p_usuario_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;

    START TRANSACTION;

    SELECT id INTO v_carrito_id FROM carrito WHERE usuario_id = p_usuario_id;

    SELECT COALESCE(SUM(dc.cantidad * dc.precio_unitario), 0) INTO v_subtotal
    FROM detalle_carrito dc WHERE dc.carrito_id = v_carrito_id;

    IF p_cupon_codigo IS NOT NULL THEN
        SELECT CASE
            WHEN tipo = 'porcentaje' THEN (v_subtotal * valor / 100)
            ELSE valor
        END INTO v_descuento
        FROM cupones
        WHERE codigo = p_cupon_codigo AND estado = 'activo'
        AND CURDATE() BETWEEN fecha_inicio AND fecha_fin
        AND v_subtotal >= minimo_compra;

        UPDATE cupones SET usos_actuales = usos_actuales + 1
        WHERE codigo = p_cupon_codigo;
    END IF;

    SET v_igv = (v_subtotal - v_descuento) * 0.18;
    SET v_costo_envio = CASE WHEN v_subtotal > 500 THEN 0 ELSE 15 END;
    SET v_total = v_subtotal - v_descuento + v_igv + v_costo_envio;
    SET v_numero_pedido = CONCAT('MP-', YEAR(CURDATE()), '-', LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0'));

    INSERT INTO pedidos (usuario_id, numero_pedido, direccion_envio_id, subtotal, descuento, igv, costo_envio, total, estado, metodo_pago, notas)
    VALUES (p_usuario_id, v_numero_pedido, p_direccion_id, v_subtotal, v_descuento, v_igv, v_costo_envio, v_total, 'pendiente', p_metodo_pago, p_notas);

    SET v_pedido_id = LAST_INSERT_ID();

    OPEN cur_items;
    read_loop: LOOP
        FETCH cur_items INTO v_item_id, v_producto_id, v_cantidad, v_precio;
        IF v_done THEN LEAVE read_loop; END IF;

        SET v_subtotal_item = v_cantidad * v_precio;

        INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
        VALUES (v_pedido_id, v_producto_id, v_cantidad, v_precio, v_subtotal_item);

        UPDATE productos SET ventas = ventas + v_cantidad WHERE id = v_producto_id;
        UPDATE inventario SET stock = stock - v_cantidad WHERE producto_id = v_producto_id;
    END LOOP;
    CLOSE cur_items;

    DELETE FROM detalle_carrito WHERE carrito_id = v_carrito_id;

    INSERT INTO historial_pedidos (pedido_id, estado_nuevo, comentario, realizado_por)
    VALUES (v_pedido_id, 'pendiente', 'Pedido creado', p_usuario_id);

    COMMIT;

    SELECT v_pedido_id as pedido_id, v_numero_pedido as numero_pedido, v_total as total;
END //

DELIMITER ;
