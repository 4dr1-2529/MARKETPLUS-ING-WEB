require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { pool, ensureAddressDeletePolicy } = require('../config/database');

(async () => {
    const connection = await pool.getConnection();
    try {
        await ensureAddressDeletePolicy(connection);
        console.log('Migracion aplicada: pedidos.direccion_envio_id ON DELETE SET NULL');
    } catch (error) {
        console.error('Error:', error.message);
        process.exitCode = 1;
    } finally {
        connection.release();
        process.exit();
    }
})();
