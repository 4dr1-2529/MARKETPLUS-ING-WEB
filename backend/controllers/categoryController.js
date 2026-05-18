const { pool } = require('../config/database');

const getAll = async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM categorias WHERE estado = \'activo\' ORDER BY nombre');
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
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const [result] = await pool.query('INSERT INTO categorias (nombre, slug, descripcion, padre_id) VALUES (?, ?, ?, ?)', [nombre, slug, descripcion, padre_id || null]);
        res.status(201).json({ success: true, message: 'Categoria creada', data: { id: result.insertId, slug } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear categoria', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { nombre, descripcion, estado, padre_id } = req.body;
        const slug = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await pool.query('UPDATE categorias SET nombre = ?, slug = ?, descripcion = ?, estado = ?, padre_id = ? WHERE id = ?', [nombre, slug, descripcion, estado, padre_id, req.params.id]);
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
