const { pool } = require('../config/database');

const getAll = async (req, res) => {
    try {
        const { page = 1, limit = 12, categoria, marca, search, minPrice, maxPrice, sort } = req.query;
        const offset = (page - 1) * limit;

        let query = `SELECT p.id, p.nombre, p.slug, p.descripcion, p.precio, p.precio_oferta, 
                     p.descuento_porcentaje, p.sku, p.estado, p.destacado, p.nuevo, p.imagen_principal, 
                     p.visitas, p.ventas, c.nombre as categoria, m.nombre as marca
                     FROM productos p 
                     JOIN categorias c ON p.categoria_id = c.id 
                     JOIN marcas m ON p.marca_id = m.id 
                     WHERE p.estado = 'activo'`;
        let countQuery = 'SELECT COUNT(*) as total FROM productos p WHERE p.estado = \'activo\'';
        const params = [];
        const countParams = [];

        if (categoria) {
            query += ' AND c.slug = ?';
            countQuery += ' AND c.slug = ?';
            params.push(categoria);
            countParams.push(categoria);
        }
        if (marca) {
            query += ' AND m.slug = ?';
            countQuery += ' AND m.slug = ?';
            params.push(marca);
            countParams.push(marca);
        }
        if (search) {
            query += ' AND (p.nombre LIKE ? OR p.descripcion LIKE ?)';
            countQuery += ' AND (p.nombre LIKE ? OR p.descripcion LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
            countParams.push(`%${search}%`, `%${search}%`);
        }
        if (minPrice) {
            query += ' AND p.precio >= ?';
            countQuery += ' AND p.precio >= ?';
            params.push(minPrice);
            countParams.push(minPrice);
        }
        if (maxPrice) {
            query += ' AND p.precio <= ?';
            countQuery += ' AND p.precio <= ?';
            params.push(maxPrice);
            countParams.push(maxPrice);
        }

        switch (sort) {
            case 'price_asc': query += ' ORDER BY p.precio ASC'; break;
            case 'price_desc': query += ' ORDER BY p.precio DESC'; break;
            case 'name_asc': query += ' ORDER BY p.nombre ASC'; break;
            case 'name_desc': query += ' ORDER BY p.nombre DESC'; break;
            case 'newest': query += ' ORDER BY p.creado_en DESC'; break;
            case 'popular': query += ' ORDER BY p.ventas DESC'; break;
            default: query += ' ORDER BY p.creado_en DESC';
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), offset);

        const [products] = await pool.query(query, params);
        const [countResult] = await pool.query(countQuery, countParams);

        res.json({
            success: true,
            data: products,
            pagination: {
                total: countResult[0].total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(countResult[0].total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener productos', error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const [products] = await pool.query(
            `SELECT p.*, c.nombre as categoria, c.slug as categoria_slug, m.nombre as marca, m.slug as marca_slug,
             (SELECT AVG(calificacion) FROM valoraciones WHERE producto_id = p.id) as promedio_valoracion,
             (SELECT COUNT(*) FROM valoraciones WHERE producto_id = p.id) as total_valoraciones
             FROM productos p 
             JOIN categorias c ON p.categoria_id = c.id 
             JOIN marcas m ON p.marca_id = m.id 
             WHERE p.slug = ?`,
            [req.params.slug]
        );

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        await pool.query('UPDATE productos SET visitas = visitas + 1 WHERE id = ?', [products[0].id]);

        const [related] = await pool.query(
            `SELECT p.id, p.nombre, p.slug, p.precio, p.precio_oferta, p.imagen_principal, p.descuento_porcentaje
             FROM productos p WHERE p.categoria_id = ? AND p.id != ? AND p.estado = 'activo' ORDER BY RAND() LIMIT 4`,
            [products[0].categoria_id, products[0].id]
        );

        const [reviews] = await pool.query(
            'SELECT v.*, u.nombres, u.apellidos, u.avatar FROM valoraciones v JOIN usuarios u ON v.usuario_id = u.id WHERE v.producto_id = ? AND v.estado = \'aprobada\' ORDER BY v.creado_en DESC LIMIT 10',
            [products[0].id]
        );

        res.json({ success: true, data: products[0], related, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener producto', error: error.message });
    }
};

const getFeatured = async (req, res) => {
    try {
        const [products] = await pool.query(
            `SELECT p.id, p.nombre, p.slug, p.precio, p.precio_oferta, p.descuento_porcentaje, 
             p.imagen_principal, p.nuevo, c.nombre as categoria, m.nombre as marca
             FROM productos p JOIN categorias c ON p.categoria_id = c.id JOIN marcas m ON p.marca_id = m.id
             WHERE p.estado = 'activo' AND p.destacado = TRUE ORDER BY p.creado_en DESC LIMIT 8`,
        );
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener productos destacados', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, categoria_id, marca_id, proveedor_id, descripcion, precio, precio_oferta, sku, garantia_meses, destacado, nuevo, imagen_principal } = req.body;
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const [result] = await pool.query(
            'INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, sku, garantia_meses, destacado, nuevo, imagen_principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta, sku, garantia_meses, destacado || false, nuevo || true, imagen_principal]
        );

        await pool.query('INSERT INTO inventario (producto_id, stock, stock_minimo) VALUES (?, 0, 5)', [result.insertId]);

        res.status(201).json({ success: true, message: 'Producto creado exitosamente', data: { id: result.insertId, slug } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear producto', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { nombre, categoria_id, marca_id, descripcion, precio, precio_oferta, sku, garantia_meses, destacado, estado, imagen_principal } = req.body;
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        await pool.query(
            'UPDATE productos SET nombre = ?, slug = ?, categoria_id = ?, marca_id = ?, descripcion = ?, precio = ?, precio_oferta = ?, sku = ?, garantia_meses = ?, destacado = ?, estado = ?, imagen_principal = ? WHERE id = ?',
            [nombre, slug, categoria_id, marca_id, descripcion, precio, precio_oferta, sku, garantia_meses, destacado, estado, imagen_principal, req.params.id]
        );

        res.json({ success: true, message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar producto', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await pool.query('UPDATE productos SET estado = \'inactivo\' WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar producto', error: error.message });
    }
};

module.exports = { getAll, getById, getFeatured, create, update, deleteProduct };
