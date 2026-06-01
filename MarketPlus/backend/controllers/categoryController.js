const { pool } = require('../config/database');
const { toSlug } = require('../utils/slug');

const getAll = async (req, res) => {
    try {
        const soloConProductos = req.query.con_productos === '1' || req.query.con_productos === 'true';
        let query = `
            SELECT c.id, c.nombre, c.slug, c.descripcion, c.imagen, c.padre_id, c.estado,
                   COUNT(p.id) AS total_productos
            FROM categorias c
            LEFT JOIN productos p ON p.categoria_id = c.id AND p.estado = 'activo'
            WHERE c.estado = 'activo'
            GROUP BY c.id, c.nombre, c.slug, c.descripcion, c.imagen, c.padre_id, c.estado
        `;
        if (soloConProductos) {
            query += ' HAVING total_productos > 0';
        }
        query += ' ORDER BY total_productos DESC, c.nombre ASC';
        const [categories] = await pool.query(query);
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener categorias', error: error.message });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT c.*, (SELECT COUNT(*) FROM productos WHERE categoria_id = c.id) as total_productos FROM categorias c ORDER BY c.nombre');
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener categorias', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, descripcion, padre_id } = req.body;
        const slug = toSlug(nombre);
        const [result] = await pool.query('INSERT INTO categorias (nombre, slug, descripcion, padre_id) VALUES (?, ?, ?, ?)', [nombre, slug, descripcion, padre_id || null]);
        res.status(201).json({ success: true, message: 'Categoria creada', data: { id: result.insertId, slug } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear categoria', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { nombre, descripcion, estado, padre_id } = req.body;
        if (!nombre || !String(nombre).trim()) {
            return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
        }
        const slug = toSlug(nombre);
        const [result] = await pool.query(
            'UPDATE categorias SET nombre = ?, slug = ?, descripcion = ?, estado = ?, padre_id = ? WHERE id = ?',
            [nombre.trim(), slug, descripcion, estado, padre_id ?? null, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Categoria no encontrada' });
        }
        res.json({ success: true, message: 'Categoria actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar categoria', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await pool.query('UPDATE categorias SET estado = \'inactivo\' WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Categoria eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar categoria', error: error.message });
    }
};

module.exports = { getAll, getAllAdmin, create, update, deleteCategory };
