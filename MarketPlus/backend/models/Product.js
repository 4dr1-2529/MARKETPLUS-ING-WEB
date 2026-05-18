const { pool } = require('../config/database');

class Product {
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        return rows[0];
    }

    static async findBySlug(slug) {
        const [rows] = await pool.query('SELECT * FROM productos WHERE slug = ?', [slug]);
        return rows[0];
    }

    static async create(data) {
        const [result] = await pool.query('INSERT INTO productos SET ?', data);
        return result.insertId;
    }

    static async update(id, data) {
        await pool.query('UPDATE productos SET ? WHERE id = ?', [data, id]);
        return true;
    }

    static async delete(id) {
        await pool.query('UPDATE productos SET estado = \'inactivo\' WHERE id = ?', [id]);
        return true;
    }

    static async checkStock(id) {
        const [rows] = await pool.query('SELECT stock FROM inventario WHERE producto_id = ?', [id]);
        return rows[0]?.stock || 0;
    }
}

module.exports = Product;
