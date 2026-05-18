const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marketplus_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '-05:00'
});

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión exitosa a MySQL - marketplus_db');
        connection.release();
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
    }
};

module.exports = { pool, testConnection };
