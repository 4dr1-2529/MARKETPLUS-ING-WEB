const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { pool } = require('../config/database');

const getByProduct = async (req, res) => {
    try {
        const [reviews] = await pool.query(
            `SELECT v.*, u.nombres, u.apellidos, u.avatar 
             FROM valoraciones v 
             JOIN usuarios u ON v.usuario_id = u.id 
             WHERE v.producto_id = ? AND v.estado = 'aprobada' 
             ORDER BY v.creado_en DESC`,
            [req.params.productId]
        );
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener valoraciones' });
    }
};

const create = async (req, res) => {
    try {
        const { producto_id, calificacion, comentario, pedido_id } = req.body;

        const [existing] = await pool.query(
            'SELECT id FROM valoraciones WHERE usuario_id = ? AND producto_id = ?',
            [req.user.id, producto_id]
        );
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Ya valoraste este producto' });
        }

        const [result] = await pool.query(
            'INSERT INTO valoraciones (usuario_id, producto_id, calificacion, comentario, pedido_id) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, producto_id, calificacion, comentario || null, pedido_id || null]
        );

        res.status(201).json({ success: true, message: 'Valoracion creada exitosamente', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear valoracion' });
    }
};

const getUserReview = async (req, res) => {
    try {
        const [reviews] = await pool.query(
            'SELECT * FROM valoraciones WHERE usuario_id = ? AND producto_id = ?',
            [req.user.id, req.params.productId]
        );
        res.json({ success: true, data: reviews[0] || null });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener valoracion' });
    }
};

const deleteReview = async (req, res) => {
    try {
        await pool.query('DELETE FROM valoraciones WHERE id = ? AND usuario_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Valoracion eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar valoracion' });
    }
};

router.get('/product/:productId', getByProduct);
router.post('/', authMiddleware, create);
router.get('/my-review/:productId', authMiddleware, getUserReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
