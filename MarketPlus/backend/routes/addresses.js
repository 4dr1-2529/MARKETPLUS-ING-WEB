const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const getAddresses = async (req, res) => {
    try {
        const [addresses] = await req.app.locals.pool.query(
            'SELECT * FROM direcciones WHERE usuario_id = ? ORDER BY es_principal DESC, creado_en DESC',
            [req.user.id]
        );
        res.json({ success: true, data: addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener direcciones' });
    }
};

const getAddressById = async (req, res) => {
    try {
        const [addresses] = await req.app.locals.pool.query(
            'SELECT * FROM direcciones WHERE id = ? AND usuario_id = ? LIMIT 1',
            [req.params.id, req.user.id]
        );
        if (addresses.length === 0) {
            return res.status(404).json({ success: false, message: 'Direccion no encontrada' });
        }
        res.json({ success: true, data: addresses[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener direccion' });
    }
};

const createAddress = async (req, res) => {
    try {
        const { tipo, destinatario, direccion_linea1, direccion_linea2, departamento, provincia, distrito, codigo_postal, referencia, telefono } = req.body;
        
        const [result] = await req.app.locals.pool.query(
            'INSERT INTO direcciones (usuario_id, tipo, destinatario, direccion_linea1, direccion_linea2, departamento, provincia, distrito, codigo_postal, referencia, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, tipo, destinatario, direccion_linea1, direccion_linea2 || null, departamento, provincia, distrito, codigo_postal || null, referencia || null, telefono || null]
        );

        res.status(201).json({ success: true, message: 'Direccion creada exitosamente', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear direccion' });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { tipo, destinatario, direccion_linea1, direccion_linea2, departamento, provincia, distrito, codigo_postal, referencia, telefono } = req.body;
        
        await req.app.locals.pool.query(
            'UPDATE direcciones SET tipo = ?, destinatario = ?, direccion_linea1 = ?, direccion_linea2 = ?, departamento = ?, provincia = ?, distrito = ?, codigo_postal = ?, referencia = ?, telefono = ? WHERE id = ? AND usuario_id = ?',
            [tipo, destinatario, direccion_linea1, direccion_linea2, departamento, provincia, distrito, codigo_postal, referencia, telefono, req.params.id, req.user.id]
        );

        res.json({ success: true, message: 'Direccion actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar direccion' });
    }
};

const deleteAddress = async (req, res) => {
    try {
        await req.app.locals.pool.query('DELETE FROM direcciones WHERE id = ? AND usuario_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Direccion eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar direccion' });
    }
};

const setPrimary = async (req, res) => {
    try {
        await req.app.locals.pool.query('UPDATE direcciones SET es_principal = FALSE WHERE usuario_id = ?', [req.user.id]);
        await req.app.locals.pool.query('UPDATE direcciones SET es_principal = TRUE WHERE id = ? AND usuario_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Direccion principal actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar direccion principal' });
    }
};

router.get('/', authMiddleware, getAddresses);
router.get('/:id', authMiddleware, getAddressById);
router.post('/', authMiddleware, createAddress);
router.put('/:id', authMiddleware, updateAddress);
router.delete('/:id', authMiddleware, deleteAddress);
router.put('/:id/primary', authMiddleware, setPrimary);

module.exports = router;
