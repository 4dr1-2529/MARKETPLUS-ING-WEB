const { pool } = require('../config/database');

const createOrder = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { direccion_id, metodo_pago, cupon_codigo, notas } = req.body;

        let [carts] = await connection.query('SELECT id FROM carrito WHERE usuario_id = ?', [req.user.id]);
        if (carts.length === 0) return res.status(400).json({ success: false, message: 'El carrito esta vacio' });

        const [items] = await connection.query(
            'SELECT dc.*, p.nombre FROM detalle_carrito dc JOIN productos p ON dc.producto_id = p.id WHERE dc.carrito_id = ?',
            [carts[0].id]
        );
        if (items.length === 0) return res.status(400).json({ success: false, message: 'El carrito esta vacio' });

        const subtotal = items.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);
        let descuento = 0;

        if (cupon_codigo) {
            const [cupones] = await connection.query('SELECT * FROM cupones WHERE codigo = ? AND estado = \'activo\' AND CURDATE() BETWEEN fecha_inicio AND fecha_fin', [cupon_codigo]);
            if (cupones.length > 0) {
                const cupon = cupones[0];
                if (subtotal >= cupon.minimo_compra) {
                    descuento = cupon.tipo === 'porcentaje' ? (subtotal * cupon.valor / 100) : cupon.valor;
                    if (cupon.maximo_descuento && descuento > cupon.maximo_descuento) descuento = cupon.maximo_descuento;
                    await connection.query('UPDATE cupones SET usos_actuales = usos_actuales + 1 WHERE id = ?', [cupon.id]);
                }
            }
        }

        const igv = (subtotal - descuento) * 0.18;
        const costo_envio = subtotal > 500 ? 0 : 15;
        const total = subtotal - descuento + igv + costo_envio;
        const numero_pedido = `MP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

        const [orderResult] = await connection.query(
            'INSERT INTO pedidos (usuario_id, numero_pedido, direccion_envio_id, subtotal, descuento, igv, costo_envio, total, estado, metodo_pago, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, \'pendiente\', ?, ?)',
            [req.user.id, numero_pedido, direccion_id, subtotal, descuento, igv, costo_envio, total, metodo_pago, notas]
        );

        for (const item of items) {
            await connection.query('INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)', [orderResult.insertId, item.producto_id, item.cantidad, item.precio_unitario, item.precio_unitario * item.cantidad]);
            await connection.query('UPDATE productos SET ventas = ventas + ? WHERE id = ?', [item.cantidad, item.producto_id]);
            await connection.query('UPDATE inventario SET stock = stock - ? WHERE producto_id = ?', [item.cantidad, item.producto_id]);
        }

        await connection.query('DELETE FROM detalle_carrito WHERE carrito_id = ?', [carts[0].id]);
        await connection.query('INSERT INTO historial_pedidos (pedido_id, estado_nuevo, comentario, realizado_por) VALUES (?, \'pendiente\', \'Pedido creado\', ?)', [orderResult.insertId, req.user.id]);

        await connection.commit();
        res.status(201).json({ success: true, message: 'Pedido creado exitosamente', data: { id: orderResult.insertId, numero_pedido } });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ success: false, message: 'Error al crear pedido', error: error.message });
    } finally {
        connection.release();
    }
};

const getMyOrders = async (req, res) => {
    try {
        const [orders] = await pool.query(
            'SELECT p.*, d.direccion_linea1, d.distrito, d.provincia FROM pedidos p JOIN direcciones d ON p.direccion_envio_id = d.id WHERE p.usuario_id = ? ORDER BY p.creado_en DESC',
            [req.user.id]
        );
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedidos', error: error.message });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        const [orders] = await pool.query(
            'SELECT p.*, d.direccion_linea1, d.distrito, d.provincia, d.departamento, d.destinatario FROM pedidos p JOIN direcciones d ON p.direccion_envio_id = d.id WHERE p.numero_pedido = ? AND p.usuario_id = ?',
            [req.params.numero, req.user.id]
        );
        if (orders.length === 0) return res.status(404).json({ success: false, message: 'Pedido no encontrado' });

        const [items] = await pool.query(
            'SELECT dp.*, p.nombre, p.imagen_principal FROM detalle_pedido dp JOIN productos p ON dp.producto_id = p.id WHERE dp.pedido_id = ?',
            [orders[0].id]
        );

        const [history] = await pool.query(
            'SELECT * FROM historial_pedidos WHERE pedido_id = ? ORDER BY creado_en ASC',
            [orders[0].id]
        );

        res.json({ success: true, data: { ...orders[0], items, history } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener detalle del pedido', error: error.message });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const { page = 1, limit = 10, estado } = req.query;
        const offset = (page - 1) * limit;
        let query = 'SELECT p.*, u.nombres, u.apellidos, u.email FROM pedidos p JOIN usuarios u ON p.usuario_id = u.id';
        let countQuery = 'SELECT COUNT(*) as total FROM pedidos p';
        const params = [];
        const countParams = [];

        if (estado) {
            query += ' WHERE p.estado = ?';
            countQuery += ' WHERE p.estado = ?';
            params.push(estado);
            countParams.push(estado);
        }

        query += ' ORDER BY p.creado_en DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), offset);

        const [orders] = await pool.query(query, params);
        const [countResult] = await pool.query(countQuery, countParams);
        res.json({ success: true, data: orders, pagination: { total: countResult[0].total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(countResult[0].total / limit) } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedidos', error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { estado, tracking_numero } = req.body;
        const [orders] = await pool.query('SELECT estado as estado_anterior FROM pedidos WHERE id = ?', [req.params.id]);
        await pool.query('UPDATE pedidos SET estado = ?, tracking_numero = ? WHERE id = ?', [estado, tracking_numero || null, req.params.id]);
        await pool.query('INSERT INTO historial_pedidos (pedido_id, estado_anterior, estado_nuevo, comentario, realizado_por) VALUES (?, ?, ?, ?, ?)', [req.params.id, orders[0].estado_anterior, estado, `Estado actualizado por admin`, req.user.id]);
        res.json({ success: true, message: 'Estado del pedido actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
    }
};

module.exports = { createOrder, getMyOrders, getOrderDetail, getAllAdmin, updateStatus };
