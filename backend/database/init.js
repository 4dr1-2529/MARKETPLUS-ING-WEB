const { pool } = require('../config/database');

const initDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Base de datos conectada correctamente');

        const [tables] = await connection.query('SHOW TABLES');
        console.log(`📊 Tablas encontradas: ${tables.length}`);

        tables.forEach(table => {
            const tableName = Object.values(table)[0];
            console.log(`   - ${tableName}`);
        });

        connection.release();
    } catch (error) {
        console.error('❌ Error inicializando base de datos:', error.message);
    }
};

module.exports = { initDatabase };
