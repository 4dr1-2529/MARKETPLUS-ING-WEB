const { pool } = require('../config/database');

const getCart = async (req, res) => {
    try {
        let [carts] = await pool.query('SELECT id FROM carrito WHERE usuario_id = ?', [req.user.id]);
        if (carts.length === 0) {
            const [result] = await pool.query('INSERT INTO carrito (usuario_id) VALUES (?)', [req.user.id]);
            carts = [{ id: result.insertId }];
        }

        const [items] = await pool.query(
            `SELECT dc.id, dc.cantidad, dc.precio_unitario, p.id as producto_id, p.nombre, p.slug, p.imagen_principal, p.precio, p.precio_oferta, 
             c.nombre as categoria, c.slug as categoria_slug, m.nombre as marca
             FROM detalle_carrito dc JOIN productos p ON dc.producto_id = p.id 
             JOIN categorias c ON p.categoria_id = c.id JOIN marcas m ON p.marca_id = m.id
             WHERE dc.carrito_id = ?`,
            [carts[0].id]
        );

        const subtotal = items.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);

        res.json({ success: true, data: { items, subtotal, total_items: items.reduce((sum, item) => sum + item.cantidad, 0) } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener carrito', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { producto_id, cantidad = 1 } = req.body;
        let [carts] = await pool.query('SELECT id FROM carrito WHERE usuario_id = ?', [req.user.id]);
        if (carts.length === 0) {
            const [result] = await pool.query('INSERT INTO carrito (usuario_id) VALUES (?)', [req.user.id]);
            carts = [{ id: result.insertId }];
        }

        const [products] = await pool.query('SELECT precio_oferta, precio FROM productos WHERE id = ? AND estado = \'activo\'', [producto_id]);
        if (products.length === 0) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

        const precio = products[0].precio_oferta || products[0].precio;
        const [existing] = await pool.query('SELECT id FROM detalle_carrito WHERE carrito_id = ? AND producto_id = ?', [carts[0].id, producto_id]);

        if (existing.length > 0) {
            await pool.query('UPDATE detalle_carrito SET cantidad = cantidad + ?, actualizado_en = NOW() WHERE id = ?', [cantidad, existing[0].id]);
        } else {
            await pool.query('INSERT INTO detalle_carrito (carrito_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [carts[0].id, producto_id, cantidad, precio]);
        }

        res.json({ success: true, message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar al carrito', error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { cantidad } = req.body;
        await pool.query('UPDATE detalle_carrito SET cantidad = ? WHERE id = ? AND carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [cantidad, req.params.id, req.user.id]);
        res.json({ success: true, message: 'Cantidad actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar cantidad', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        await pool.query('DELETE FROM detalle_carrito WHERE id = ? AND carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar del carrito', error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        await pool.query('DELETE FROM detalle_carrito WHERE carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [req.user.id]);
        res.json({ success: true, message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al vaciar carrito', error: error.message });
    }
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart };
