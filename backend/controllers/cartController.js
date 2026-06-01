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
             c.nombre as categoria, c.slug as categoria_slug, m.nombre as marca, i.stock as stock_disponible
             FROM detalle_carrito dc JOIN productos p ON dc.producto_id = p.id 
             JOIN categorias c ON p.categoria_id = c.id JOIN marcas m ON p.marca_id = m.id
             LEFT JOIN inventario i ON i.producto_id = p.id
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
        const productoId = Number(req.body.producto_id);
        const cantidadSolicitada = Number(req.body.cantidad || 1);
        if (!productoId || Number.isNaN(productoId)) {
            return res.status(400).json({ success: false, message: 'Producto invalido' });
        }
        if (!cantidadSolicitada || Number.isNaN(cantidadSolicitada) || cantidadSolicitada < 1) {
            return res.status(400).json({ success: false, message: 'Cantidad invalida' });
        }

        let [carts] = await pool.query('SELECT id FROM carrito WHERE usuario_id = ?', [req.user.id]);
        if (carts.length === 0) {
            const [result] = await pool.query('INSERT INTO carrito (usuario_id) VALUES (?)', [req.user.id]);
            carts = [{ id: result.insertId }];
        }

        const [products] = await pool.query(
            `SELECT p.precio_oferta, p.precio, COALESCE(i.stock, 0) AS stock_disponible
             FROM productos p
             LEFT JOIN inventario i ON i.producto_id = p.id
             WHERE p.id = ? AND p.estado = 'activo'`,
            [productoId]
        );
        if (products.length === 0) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

        const precio = products[0].precio_oferta || products[0].precio;
        const stockDisponible = Number(products[0].stock_disponible || 0);
        const [existing] = await pool.query('SELECT id, cantidad FROM detalle_carrito WHERE carrito_id = ? AND producto_id = ?', [carts[0].id, productoId]);
        const cantidadActual = existing.length > 0 ? Number(existing[0].cantidad || 0) : 0;
        const cantidadFinal = cantidadActual + cantidadSolicitada;

        if (stockDisponible <= 0) {
            return res.status(400).json({ success: false, message: 'Producto sin stock disponible' });
        }
        if (cantidadFinal > stockDisponible) {
            return res.status(400).json({ success: false, message: `Stock insuficiente. Disponible: ${stockDisponible}` });
        }

        if (existing.length > 0) {
            await pool.query('UPDATE detalle_carrito SET cantidad = ?, actualizado_en = NOW() WHERE id = ?', [cantidadFinal, existing[0].id]);
            return res.json({ success: true, message: 'Cantidad actualizada en el carrito' });
        } else {
            await pool.query('INSERT INTO detalle_carrito (carrito_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [carts[0].id, productoId, cantidadSolicitada, precio]);
            return res.json({ success: true, message: 'Producto agregado al carrito' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'No se pudo agregar el producto' });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const cantidad = Number(req.body.cantidad);
        const itemId = Number(req.params.id);
        if (!cantidad || Number.isNaN(cantidad) || cantidad < 1) {
            return res.status(400).json({ success: false, message: 'Cantidad invalida' });
        }
        const [items] = await pool.query(
            `SELECT dc.id, p.id AS producto_id, COALESCE(i.stock, 0) AS stock_disponible
             FROM detalle_carrito dc
             JOIN carrito c ON c.id = dc.carrito_id
             JOIN productos p ON p.id = dc.producto_id
             LEFT JOIN inventario i ON i.producto_id = p.id
             WHERE dc.id = ? AND c.usuario_id = ?`,
            [itemId, req.user.id]
        );
        if (items.length === 0) {
            return res.status(404).json({ success: false, message: 'Item no encontrado en carrito' });
        }
        const stockDisponible = Number(items[0].stock_disponible || 0);
        if (cantidad > stockDisponible) {
            return res.status(400).json({ success: false, message: `Stock insuficiente. Disponible: ${stockDisponible}` });
        }

        await pool.query('UPDATE detalle_carrito SET cantidad = ? WHERE id = ? AND carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [cantidad, itemId, req.user.id]);
        res.json({ success: true, message: 'Cantidad actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar cantidad' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        await pool.query('DELETE FROM detalle_carrito WHERE id = ? AND carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar del carrito' });
    }
};

const clearCart = async (req, res) => {
    try {
        await pool.query('DELETE FROM detalle_carrito WHERE carrito_id IN (SELECT id FROM carrito WHERE usuario_id = ?)', [req.user.id]);
        res.json({ success: true, message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al vaciar carrito' });
    }
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart };
