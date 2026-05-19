const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { pool } = require('../config/database');

const getAll = async (req, res) => {
    try {
        const [notifications] = await pool.query(
            'SELECT * FROM notificaciones WHERE usuario_id = ? ORDER BY creado_en DESC LIMIT 50',
            [req.user.id]
        );
        res.json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener notificaciones', error: error.message });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT COUNT(*) as count FROM notificaciones WHERE usuario_id = ? AND leido = FALSE',
            [req.user.id]
        );
        res.json({ success: true, data: { count: result[0].count } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener contador', error: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        await pool.query('UPDATE notificaciones SET leido = TRUE WHERE id = ? AND usuario_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Notificacion marcada como leida' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al marcar notificacion', error: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await pool.query('UPDATE notificaciones SET leido = TRUE WHERE usuario_id = ? AND leido = FALSE', [req.user.id]);
        res.json({ success: true, message: 'Todas las notificaciones marcadas como leidas' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al marcar notificaciones', error: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        await pool.query('DELETE FROM notificaciones WHERE id = ? AND usuario_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Notificacion eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar notificacion', error: error.message });
    }
};

router.get('/', authMiddleware, getAll);
router.get('/unread-count', authMiddleware, getUnreadCount);
router.put('/:id/read', authMiddleware, markAsRead);
router.put('/read-all', authMiddleware, markAllAsRead);
router.delete('/:id', authMiddleware, deleteNotification);

module.exports = router;
