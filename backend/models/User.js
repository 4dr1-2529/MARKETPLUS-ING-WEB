const { pool } = require('../config/database');

class User {
    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT u.id, u.nombres, u.apellidos, u.email, u.telefono, u.dni, u.avatar, u.estado, u.creado_en, r.nombre as role FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
            [id]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT u.*, r.nombre as role FROM usuarios u JOIN roles r ON u.role_id = r.id WHERE u.email = ?',
            [email]
        );
        return rows[0];
    }

    static async create(data) {
        const [result] = await pool.query('INSERT INTO usuarios SET ?', data);
        return result.insertId;
    }

    static async update(id, data) {
        await pool.query('UPDATE usuarios SET ? WHERE id = ?', [data, id]);
        return true;
    }

    static async updateLastAccess(id) {
        await pool.query('UPDATE usuarios SET ultimo_acceso = NOW() WHERE id = ?', [id]);
        return true;
    }
}

module.exports = User;
