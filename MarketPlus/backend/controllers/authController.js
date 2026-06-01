const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const register = async (req, res) => {
    try {
        const { username, nombres, apellidos, email, password, telefono, dni } = req.body;
        const normalizedUsername = String(username || '').trim();
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const normalizedDni = String(dni || '').trim() || null;
        const normalizedTelefono = String(telefono || '').trim() || null;

        const [existingByUsername] = await pool.query('SELECT id FROM usuarios WHERE username = ?', [normalizedUsername]);
        if (existingByUsername.length > 0) {
            return res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso' });
        }

        const [existingByEmail] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [normalizedEmail]);
        if (existingByEmail.length > 0) {
            return res.status(400).json({ success: false, message: 'El email ya está registrado' });
        }

        if (normalizedDni) {
            const [existingByDni] = await pool.query('SELECT id FROM usuarios WHERE dni = ?', [normalizedDni]);
            if (existingByDni.length > 0) {
                return res.status(400).json({ success: false, message: 'El DNI ya está registrado' });
            }
        }

        if (normalizedTelefono) {
            const [existingByTelefono] = await pool.query('SELECT id FROM usuarios WHERE telefono = ?', [normalizedTelefono]);
            if (existingByTelefono.length > 0) {
                return res.status(400).json({ success: false, message: 'El telefono ya está registrado' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO usuarios (role_id, username, nombres, apellidos, email, password, telefono, dni) VALUES (2, ?, ?, ?, ?, ?, ?, ?)',
            [normalizedUsername, nombres, apellidos, normalizedEmail, hashedPassword, normalizedTelefono, normalizedDni]
        );

        const token = jwt.sign(
            { id: result.insertId, email: normalizedEmail, username: normalizedUsername, role: 'usuario' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'Cuenta creada correctamente',
            data: {
                id: result.insertId,
                username: normalizedUsername,
                nombres,
                apellidos,
                email: normalizedEmail,
                role: 'usuario',
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const identifierRaw = String(req.body.identifier || req.body.email || '').trim();
        const emailCandidate = identifierRaw.toLowerCase();
        if (/^\d{8,15}$/.test(identifierRaw)) {
            return res.status(400).json({ success: false, message: 'Ingresa email o nombre de usuario, no DNI ni telefono' });
        }
        const { password } = req.body;

        const [users] = await pool.query(
            `SELECT u.id, u.username, u.nombres, u.apellidos, u.email, u.password, u.estado, u.avatar, r.nombre as role
             FROM usuarios u
             JOIN roles r ON u.role_id = r.id
             WHERE u.email = ? OR u.username = ?
             LIMIT 1`,
            [emailCandidate, identifierRaw]
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
                username: user.username,
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
            'SELECT u.id, u.username, u.nombres, u.apellidos, u.email, u.telefono, u.dni, u.avatar, u.estado, u.creado_en, r.nombre as role FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
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
        const { username, nombres, apellidos, telefono, dni } = req.body;

        if (!nombres?.trim() || !apellidos?.trim()) {
            return res.status(400).json({ success: false, message: 'Nombres y apellidos son obligatorios' });
        }

        const normalizedUsername = username ? String(username).trim() : null;
        const normalizedTelefono = telefono ? String(telefono).trim() : null;
        const normalizedDni = dni ? String(dni).trim() : null;

        if (normalizedUsername) {
            const [existingUsername] = await pool.query('SELECT id FROM usuarios WHERE username = ? AND id <> ?', [normalizedUsername, req.user.id]);
            if (existingUsername.length > 0) {
                return res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso' });
            }
        }
        if (normalizedDni) {
            const [existingDni] = await pool.query('SELECT id FROM usuarios WHERE dni = ? AND id <> ?', [normalizedDni, req.user.id]);
            if (existingDni.length > 0) {
                return res.status(400).json({ success: false, message: 'El DNI ya está registrado' });
            }
        }
        if (normalizedTelefono) {
            const [existingTelefono] = await pool.query('SELECT id FROM usuarios WHERE telefono = ? AND id <> ?', [normalizedTelefono, req.user.id]);
            if (existingTelefono.length > 0) {
                return res.status(400).json({ success: false, message: 'El telefono ya está registrado' });
            }
        }

        await pool.query(
            'UPDATE usuarios SET username = COALESCE(?, username), nombres = ?, apellidos = ?, telefono = ?, dni = ? WHERE id = ?',
            [normalizedUsername, nombres, apellidos, normalizedTelefono, normalizedDni, req.user.id]
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

        const crypto = require('node:crypto');
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
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 8 caracteres' });
        }
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

const changePassword = async (req, res) => {
    try {
        const { passwordActual, nuevaPassword } = req.body;

        if (!passwordActual || !nuevaPassword) {
            return res.status(400).json({ success: false, message: 'Contraseñas requeridas' });
        }

        if (nuevaPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }

        const [users] = await pool.query('SELECT password FROM usuarios WHERE id = ?', [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(passwordActual, users[0].password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'La contraseña actual es incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
        await pool.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);

        res.json({ success: true, message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar contraseña', error: error.message });
    }
};

module.exports = { register, login, getProfile, updateProfile, forgotPassword, resetPassword, changePassword };
