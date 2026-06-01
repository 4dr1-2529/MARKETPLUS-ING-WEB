const { pool } = require('../config/database');

const getDashboard = async (req, res) => {
    try {
        const [[{ total_ventas }]] = await pool.query('SELECT COUNT(*) as total_ventas FROM pedidos WHERE estado != \'cancelado\'');
        const [[{ ingresos_totales }]] = await pool.query('SELECT COALESCE(SUM(total), 0) as ingresos_totales FROM pedidos WHERE estado IN (\'entregado\', \'enviado\', \'procesando\')');
        const [[{ total_usuarios }]] = await pool.query('SELECT COUNT(*) as total_usuarios FROM usuarios WHERE role_id = 2');
        const [[{ total_productos }]] = await pool.query('SELECT COUNT(*) as total_productos FROM productos WHERE estado = \'activo\'');
        const [[{ pedidos_mes }]] = await pool.query('SELECT COUNT(*) as pedidos_mes FROM pedidos WHERE MONTH(creado_en) = MONTH(CURDATE()) AND YEAR(creado_en) = YEAR(CURDATE())');
        const [[{ ingresos_mes }]] = await pool.query('SELECT COALESCE(SUM(total), 0) as ingresos_mes FROM pedidos WHERE MONTH(creado_en) = MONTH(CURDATE()) AND YEAR(creado_en) = YEAR(CURDATE()) AND estado != \'cancelado\'');

        const [ventas_mensuales] = await pool.query(
            'SELECT MONTH(creado_en) as mes, COUNT(*) as total, COALESCE(SUM(total), 0) as ingresos FROM pedidos WHERE YEAR(creado_en) = YEAR(CURDATE()) AND estado != \'cancelado\' GROUP BY MONTH(creado_en) ORDER BY mes'
        );

        const [top_productos] = await pool.query(
            'SELECT p.nombre, p.imagen_principal, SUM(dp.cantidad) as total_vendido, SUM(dp.subtotal) as ingresos FROM detalle_pedido dp JOIN productos p ON dp.producto_id = p.id GROUP BY dp.producto_id ORDER BY total_vendido DESC LIMIT 5'
        );

        const [pedidos_recientes] = await pool.query(
            'SELECT p.numero_pedido, p.total, p.estado, p.creado_en, u.nombres, u.apellidos FROM pedidos p JOIN usuarios u ON p.usuario_id = u.id ORDER BY p.creado_en DESC LIMIT 5'
        );

        res.json({
            success: true,
            data: {
                stats: { total_ventas, ingresos_totales, total_usuarios, total_productos, pedidos_mes, ingresos_mes },
                ventas_mensuales,
                top_productos,
                pedidos_recientes
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener dashboard', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT u.id, u.nombres, u.apellidos, u.email, u.telefono, u.dni, u.estado, u.role_id, u.creado_en, r.nombre AS role FROM usuarios u JOIN roles r ON u.role_id = r.id ORDER BY u.creado_en DESC'
        );
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const updateUser = async (req, res) => {
    try {
        const { nombres, apellidos, telefono, estado, role_id } = req.body;
        const fields = [];
        const values = [];

        if (nombres !== undefined) {
            const v = String(nombres).trim();
            if (v.length < 2 || !NAME_REGEX.test(v)) {
                return res.status(400).json({ success: false, message: 'Nombres invalidos (solo letras)' });
            }
            fields.push('nombres = ?');
            values.push(v);
        }
        if (apellidos !== undefined) {
            const v = String(apellidos).trim();
            if (v.length < 2 || !NAME_REGEX.test(v)) {
                return res.status(400).json({ success: false, message: 'Apellidos invalidos (solo letras)' });
            }
            fields.push('apellidos = ?');
            values.push(v);
        }
        if (telefono !== undefined) {
            const v = telefono ? String(telefono).trim() : null;
            if (v && !/^\d{9}$/.test(v)) {
                return res.status(400).json({ success: false, message: 'El telefono debe tener exactamente 9 digitos' });
            }
            fields.push('telefono = ?');
            values.push(v);
        }
        if (estado !== undefined) {
            fields.push('estado = ?');
            values.push(estado);
        }
        if (role_id !== undefined) {
            fields.push('role_id = ?');
            values.push(Number(role_id));
        }

        if (fields.length === 0) {
            return res.status(400).json({ success: false, message: 'No hay datos para actualizar' });
        }

        values.push(req.params.id);
        const [result] = await pool.query(`UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.json({ success: true, message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
};

const getInventory = async (req, res) => {
    try {
        const [inventory] = await pool.query(
            'SELECT i.*, p.nombre, p.sku, c.nombre as categoria, m.nombre as marca FROM inventario i JOIN productos p ON i.producto_id = p.id JOIN categorias c ON p.categoria_id = c.id JOIN marcas m ON p.marca_id = m.id ORDER BY i.stock ASC'
        );
        res.json({ success: true, data: inventory });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener inventario', error: error.message });
    }
};

const updateInventory = async (req, res) => {
    try {
        const stock = Math.max(0, Number(req.body.stock));
        if (Number.isNaN(stock)) {
            return res.status(400).json({ success: false, message: 'Stock invalido' });
        }

        const [result] = await pool.query(
            'UPDATE inventario SET stock = ? WHERE producto_id = ?',
            [stock, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado en inventario' });
        }
        res.json({ success: true, message: 'Inventario actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar inventario', error: error.message });
    }
};

const updateInventoryBatch = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const items = Array.isArray(req.body?.items) ? req.body.items : [];
        if (items.length === 0) {
            return res.status(400).json({ success: false, message: 'No hay items para actualizar' });
        }

        await connection.beginTransaction();
        let updated = 0;

        for (const item of items) {
            const productoId = Number(item.producto_id);
            const stock = Math.max(0, Number(item.stock));
            if (!productoId || Number.isNaN(stock)) continue;

            const [result] = await connection.query(
                'UPDATE inventario SET stock = ? WHERE producto_id = ?',
                [stock, productoId]
            );
            updated += result.affectedRows;
        }

        await connection.commit();
        res.json({ success: true, message: 'Inventario actualizado', data: { updated } });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ success: false, message: 'Error al actualizar inventario', error: error.message });
    } finally {
        connection.release();
    }
};

const getReports = async (req, res) => {
    try {
        const [orderStatusSummary] = await pool.query(
            "SELECT estado, COUNT(*) as total, COALESCE(SUM(total), 0) as monto FROM pedidos GROUP BY estado ORDER BY total DESC"
        );

        const [topCategories] = await pool.query(
            'SELECT c.nombre, COUNT(DISTINCT p.id) as total_productos, COALESCE(SUM(p.ventas), 0) as total_ventas FROM categorias c LEFT JOIN productos p ON c.id = p.categoria_id GROUP BY c.id ORDER BY total_ventas DESC LIMIT 10'
        );

        const [salesByDay] = await pool.query(
            "SELECT DATE(creado_en) as fecha, COUNT(*) as total_pedidos, COALESCE(SUM(total), 0) as ingresos FROM pedidos WHERE creado_en >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND estado != 'cancelado' GROUP BY DATE(creado_en) ORDER BY fecha"
        );

        const [topCustomers] = await pool.query(
            'SELECT u.id, u.nombres, u.apellidos, u.email, COUNT(p.id) as total_pedidos, COALESCE(SUM(p.total), 0) as total_gastado FROM usuarios u JOIN pedidos p ON u.id = p.usuario_id WHERE p.estado != \'cancelado\' GROUP BY u.id ORDER BY total_gastado DESC LIMIT 10'
        );

        const [lowStockProducts] = await pool.query(
            'SELECT p.nombre, p.sku, i.stock FROM inventario i JOIN productos p ON i.producto_id = p.id WHERE i.stock <= 0 ORDER BY p.nombre ASC'
        );

        const [[{ totalRevenue }]] = await pool.query(
            "SELECT COALESCE(SUM(total), 0) as totalRevenue FROM pedidos WHERE estado IN ('entregado', 'enviado', 'procesando')"
        );

        const [[{ avgOrderValue }]] = await pool.query(
            "SELECT COALESCE(AVG(total), 0) as avgOrderValue FROM pedidos WHERE estado != 'cancelado'"
        );

        const [[{ conversionRate }]] = await pool.query(
            'SELECT COALESCE((COUNT(DISTINCT p.usuario_id) * 100.0 / NULLIF(COUNT(DISTINCT u.id), 0)), 0) as conversionRate FROM usuarios u LEFT JOIN pedidos p ON u.id = p.usuario_id WHERE u.role_id = 2'
        );

        res.json({
            success: true,
            data: {
                orderStatusSummary,
                topCategories,
                salesByDay,
                topCustomers,
                lowStockProducts,
                totalRevenue: totalRevenue.totalRevenue,
                avgOrderValue: avgOrderValue.avgOrderValue,
                conversionRate: conversionRate.conversionRate
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener reportes', error: error.message });
    }
};

module.exports = {
    getDashboard,
    getAllUsers,
    updateUser,
    getInventory,
    updateInventory,
    updateInventoryBatch,
    getReports
};
