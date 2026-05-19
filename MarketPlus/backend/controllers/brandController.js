const { pool } = require('../config/database');

const getAll = async (req, res) => {
    try {
        const { categoria } = req.query;
        let query = `
            SELECT m.id, m.nombre, m.slug, m.logo, m.pais_origen, m.sitio_web, m.estado,
                   COUNT(DISTINCT p.id) AS total_productos
            FROM marcas m
            INNER JOIN productos p ON p.marca_id = m.id AND p.estado = 'activo'
            INNER JOIN categorias c ON p.categoria_id = c.id AND c.estado = 'activo'
            WHERE m.estado = 'activo'
        `;
        const params = [];
        if (categoria) {
            query += ' AND c.slug = ?';
            params.push(categoria);
        }
        query += ' GROUP BY m.id, m.nombre, m.slug, m.logo, m.pais_origen, m.sitio_web, m.estado';
        query += ' HAVING total_productos > 0 ORDER BY m.nombre ASC';
        const [brands] = await pool.query(query, params);
        res.json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener marcas', error: error.message });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const [brands] = await pool.query('SELECT m.*, (SELECT COUNT(*) FROM productos WHERE marca_id = m.id) as total_productos FROM marcas m ORDER BY m.nombre');
        res.json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener marcas', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, pais_origen, sitio_web } = req.body;
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const [result] = await pool.query('INSERT INTO marcas (nombre, slug, pais_origen, sitio_web) VALUES (?, ?, ?, ?)', [nombre, slug, pais_origen, sitio_web]);
        res.status(201).json({ success: true, message: 'Marca creada', data: { id: result.insertId, slug } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear marca', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { nombre, pais_origen, sitio_web, estado, logo } = req.body;
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await pool.query('UPDATE marcas SET nombre = ?, slug = ?, pais_origen = ?, sitio_web = ?, estado = ?, logo = ? WHERE id = ?', [nombre, slug, pais_origen, sitio_web, estado, logo, req.params.id]);
        res.json({ success: true, message: 'Marca actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar marca', error: error.message });
    }
};

const deleteBrand = async (req, res) => {
    try {
        await pool.query('UPDATE marcas SET estado = \'inactivo\' WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Marca eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar marca', error: error.message });
    }
};

module.exports = { getAll, getAllAdmin, create, update, deleteBrand };
