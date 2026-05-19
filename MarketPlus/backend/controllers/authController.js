const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const register = async (req, res) => {
    try {
        const { nombres, apellidos, email, password, telefono, dni } = req.body;

        const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO usuarios (role_id, nombres, apellidos, email, password, telefono, dni) VALUES (2, ?, ?, ?, ?, ?, ?)',
            [nombres, apellidos, email, hashedPassword, telefono, dni]
        );

        const token = jwt.sign(
            { id: result.insertId, email, role: 'usuario' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                id: result.insertId,
                nombres,
                apellidos,
                email,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await pool.query(
            'SELECT u.id, u.nombres, u.apellidos, u.email, u.password, u.estado, u.avatar, r.nombre as role FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        const user = users[0];
        if (user.estado !== 'activo') {
            return res.status(403).json({ success: false, message: 'Cuenta desactivada. Contacta al administrador' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        await pool.query('UPDATE usuarios SET ultimo_acceso = NOW() WHERE id = ?', [user.id]);

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                id: user.id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT u.id, u.nombres, u.apellidos, u.email, u.telefono, u.dni, u.avatar, u.estado, u.creado_en, r.nombre as role FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.json({ success: true, data: users[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener perfil', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { nombres, apellidos, telefono, dni } = req.body;
        await pool.query(
            'UPDATE usuarios SET nombres = ?, apellidos = ?, telefono = ?, dni = ? WHERE id = ?',
            [nombres, apellidos, telefono, dni, req.user.id]
        );
        res.json({ success: true, message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar perfil', error: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const [users] = await pool.query('SELECT id, nombres, email FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.json({ success: true, message: 'Si el email existe, recibirás instrucciones de recuperación' });
        }

        const crypto = require('crypto');
        const token = crypto.randomBytes(32).toString('hex');
        const expiracion = new Date(Date.now() + 3600000);

        await pool.query(
            'UPDATE usuarios SET token_recuperacion = ?, expiracion_token = ? WHERE id = ?',
            [token, expiracion, users[0].id]
        );

        res.json({
            success: true,
            message: 'Si el email existe, recibirás instrucciones de recuperación',
            data: process.env.NODE_ENV === 'development' ? { resetToken: token } : undefined
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al procesar solicitud', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const [users] = await pool.query(
            'SELECT id FROM usuarios WHERE token_recuperacion = ? AND expiracion_token > NOW()',
            [token]
        );
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'UPDATE usuarios SET password = ?, token_recuperacion = NULL, expiracion_token = NULL WHERE id = ?',
            [hashedPassword, users[0].id]
        );

        res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al restablecer contraseña', error: error.message });
    }
};

module.exports = { register, login, getProfile, updateProfile, forgotPassword, resetPassword };
