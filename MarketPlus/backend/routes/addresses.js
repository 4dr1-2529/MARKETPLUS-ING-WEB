const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { validateAddress } = require('../middleware/validations');
const { ensureAddressDeletePolicy } = require('../config/database');

const TIENDA_DIRECCION = 'Recojo en tienda MarketPlus - Av. Junin 1234, Huancayo';

const normalizeAddressPayload = (body) => {
    const tipo = body.tipo === 'recojo_tienda' ? 'recojo_tienda' : 'domicilio';
    const telefono = body.telefono ? String(body.telefono).trim() : null;

    if (tipo === 'recojo_tienda') {
        return {
            tipo,
            destinatario: String(body.destinatario || '').trim(),
            direccion_linea1: TIENDA_DIRECCION,
            direccion_linea2: null,
            departamento: 'Junin',
            provincia: 'Huancayo',
            distrito: 'Huancayo',
            codigo_postal: body.codigo_postal || '12001',
            referencia: body.referencia || null,
            telefono,
            dni_contacto: String(body.dni_contacto || '').trim()
        };
    }

    return {
        tipo,
        destinatario: String(body.destinatario || '').trim(),
        direccion_linea1: String(body.direccion_linea1 || '').trim(),
        direccion_linea2: body.direccion_linea2 || null,
        departamento: String(body.departamento || '').trim(),
        provincia: String(body.provincia || '').trim(),
        distrito: String(body.distrito || '').trim(),
        codigo_postal: body.codigo_postal || null,
        referencia: body.referencia || null,
        telefono,
        dni_contacto: null
    };
};

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
        const data = normalizeAddressPayload(req.body);

        const [result] = await req.app.locals.pool.query(
            `INSERT INTO direcciones (usuario_id, tipo, destinatario, direccion_linea1, direccion_linea2, departamento, provincia, distrito, codigo_postal, referencia, telefono, dni_contacto)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.user.id, data.tipo, data.destinatario, data.direccion_linea1, data.direccion_linea2, data.departamento, data.provincia, data.distrito, data.codigo_postal, data.referencia, data.telefono, data.dni_contacto]
        );

        res.status(201).json({ success: true, message: 'Direccion creada exitosamente', data: { id: result.insertId } });
    } catch (error) {
        console.error('Error al crear direccion:', error.code, error.message);
        const message = mapAddressDbError(error);
        res.status(500).json({ success: false, message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const data = normalizeAddressPayload(req.body);

        const [result] = await req.app.locals.pool.query(
            `UPDATE direcciones SET tipo = ?, destinatario = ?, direccion_linea1 = ?, direccion_linea2 = ?, departamento = ?, provincia = ?, distrito = ?, codigo_postal = ?, referencia = ?, telefono = ?, dni_contacto = ?
             WHERE id = ? AND usuario_id = ?`,
            [data.tipo, data.destinatario, data.direccion_linea1, data.direccion_linea2, data.departamento, data.provincia, data.distrito, data.codigo_postal, data.referencia, data.telefono, data.dni_contacto, req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Direccion no encontrada' });
        }
        res.json({ success: true, message: 'Direccion actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar direccion:', error.code, error.message);
        const message = mapAddressDbError(error);
        res.status(500).json({ success: false, message });
    }
};

const mapAddressDbError = (error) => {
    if (error.code === 'WARN_DATA_TRUNCATED' || error.errno === 1265) {
        return 'La base de datos no acepta recojo en tienda. Reinicia el backend o ejecuta database/actualizar-checkout.sql';
    }
    if (error.code === 'ER_BAD_FIELD_ERROR') {
        return 'Falta la columna dni_contacto en direcciones. Ejecuta database/actualizar-checkout.sql';
    }
    return error.message || 'Error al guardar la direccion';
};

const runDeleteAddress = async (connection, addressId, userId) => {
    const [owned] = await connection.query(
        'SELECT id FROM direcciones WHERE id = ? AND usuario_id = ? LIMIT 1',
        [addressId, userId]
    );
    if (owned.length === 0) {
        return { notFound: true };
    }

    await connection.query(
        'UPDATE pedidos SET direccion_envio_id = NULL WHERE direccion_envio_id = ? AND usuario_id = ?',
        [addressId, userId]
    );

    const [result] = await connection.query(
        'DELETE FROM direcciones WHERE id = ? AND usuario_id = ?',
        [addressId, userId]
    );
    return { notFound: result.affectedRows === 0 };
};

const deleteAddress = async (req, res) => {
    const addressId = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(addressId)) {
        return res.status(400).json({ success: false, message: 'Identificador de direccion invalido' });
    }

    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    let outcome;

    try {
        await connection.beginTransaction();
        outcome = await runDeleteAddress(connection, addressId, req.user.id);
        await connection.commit();

        if (outcome.notFound) {
            return res.status(404).json({ success: false, message: 'Direccion no encontrada' });
        }
        return res.json({ success: true, message: 'Direccion eliminada exitosamente' });
    } catch (error) {
        await connection.rollback();

        const fkBlocked = error.code === 'ER_ROW_IS_REFERENCED_2' || error.code === 'ER_BAD_NULL_ERROR';
        if (fkBlocked) {
            try {
                await ensureAddressDeletePolicy(connection);
                await connection.beginTransaction();
                outcome = await runDeleteAddress(connection, addressId, req.user.id);
                await connection.commit();

                if (outcome.notFound) {
                    return res.status(404).json({ success: false, message: 'Direccion no encontrada' });
                }
                return res.json({ success: true, message: 'Direccion eliminada exitosamente' });
            } catch (retryErr) {
                await connection.rollback();
                console.error('Error al eliminar direccion (reintento):', retryErr.code || retryErr.message);
                return res.status(500).json({ success: false, message: 'Error al eliminar direccion' });
            }
        }

        console.error('Error al eliminar direccion:', error.code || error.message);
        return res.status(500).json({ success: false, message: 'Error al eliminar direccion' });
    } finally {
        connection.release();
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
router.post('/', authMiddleware, validateAddress, createAddress);
router.put('/:id', authMiddleware, validateAddress, updateAddress);
router.delete('/:id', authMiddleware, deleteAddress);
router.put('/:id/primary', authMiddleware, setPrimary);

module.exports = router;
