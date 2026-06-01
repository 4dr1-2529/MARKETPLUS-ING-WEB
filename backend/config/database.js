const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marketplus_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '-05:00'
});

const ensureCheckoutSchema = async (connection) => {
    const [dniCol] = await connection.query("SHOW COLUMNS FROM direcciones LIKE 'dni_contacto'");
    if (dniCol.length === 0) {
        await connection.query('ALTER TABLE direcciones ADD COLUMN dni_contacto VARCHAR(8) NULL AFTER telefono');
    }

    const pedidoCols = {
        tipo_comprobante: "ALTER TABLE pedidos ADD COLUMN tipo_comprobante ENUM('boleta', 'factura') NULL AFTER metodo_pago",
        comprobante_dni: 'ALTER TABLE pedidos ADD COLUMN comprobante_dni VARCHAR(8) NULL AFTER tipo_comprobante',
        comprobante_ruc: 'ALTER TABLE pedidos ADD COLUMN comprobante_ruc VARCHAR(11) NULL AFTER comprobante_dni',
        comprobante_razon_social: 'ALTER TABLE pedidos ADD COLUMN comprobante_razon_social VARCHAR(255) NULL AFTER comprobante_ruc',
        comprobante_direccion_fiscal: 'ALTER TABLE pedidos ADD COLUMN comprobante_direccion_fiscal VARCHAR(255) NULL AFTER comprobante_razon_social',
        datos_pago: 'ALTER TABLE pedidos ADD COLUMN datos_pago JSON NULL AFTER comprobante_direccion_fiscal',
        comprobante_nombre: 'ALTER TABLE pedidos ADD COLUMN comprobante_nombre VARCHAR(200) NULL AFTER comprobante_direccion_fiscal',
        estado_pago: "ALTER TABLE pedidos ADD COLUMN estado_pago ENUM('pendiente', 'simulado_completado', 'completado', 'fallido') DEFAULT 'simulado_completado' AFTER datos_pago",
        es_pago_simulado: 'ALTER TABLE pedidos ADD COLUMN es_pago_simulado BOOLEAN DEFAULT TRUE AFTER estado_pago'
    };
    for (const [col, sql] of Object.entries(pedidoCols)) {
        const [rows] = await connection.query('SHOW COLUMNS FROM pedidos LIKE ?', [col]);
        if (rows.length === 0) {
            await connection.query(sql);
        }
    }

    await ensureDireccionesTipoEnum(connection);
    await ensureAddressDeletePolicy(connection);
};

const ensureDireccionesTipoEnum = async (connection) => {
    try {
        const [col] = await connection.query("SHOW COLUMNS FROM direcciones LIKE 'tipo'");
        if (col.length === 0) return;

        const typeDef = String(col[0].Type || '');
        if (typeDef.includes('recojo_tienda') && !typeDef.includes('envio')) return;

        await connection.query("UPDATE direcciones SET tipo = 'domicilio' WHERE tipo IN ('envio', 'facturacion', 'ambas') OR tipo IS NULL OR tipo = ''");
        await connection.query("ALTER TABLE direcciones MODIFY COLUMN tipo ENUM('domicilio', 'recojo_tienda') NOT NULL DEFAULT 'domicilio'");
        console.log('✅ direcciones.tipo migrado a domicilio/recojo_tienda');
    } catch (err) {
        console.warn('Aviso migracion direcciones.tipo:', err.message);
    }
};

const ensureAddressDeletePolicy = async (connection) => {
    const [fks] = await connection.query(
        `SELECT k.CONSTRAINT_NAME, r.DELETE_RULE
         FROM information_schema.KEY_COLUMN_USAGE k
         JOIN information_schema.REFERENTIAL_CONSTRAINTS r
           ON r.CONSTRAINT_SCHEMA = k.CONSTRAINT_SCHEMA AND r.CONSTRAINT_NAME = k.CONSTRAINT_NAME
         WHERE k.TABLE_SCHEMA = DATABASE()
           AND k.TABLE_NAME = 'pedidos'
           AND k.COLUMN_NAME = 'direccion_envio_id'
           AND k.REFERENCED_TABLE_NAME = 'direcciones'`
    );

    const alreadyOk = fks.some((row) => row.DELETE_RULE === 'SET NULL');
    if (!alreadyOk) {
        for (const row of fks) {
            await connection.query(`ALTER TABLE pedidos DROP FOREIGN KEY \`${row.CONSTRAINT_NAME}\``);
        }
    }

    const [col] = await connection.query("SHOW COLUMNS FROM pedidos LIKE 'direccion_envio_id'");
    if (col.length > 0 && col[0].Null === 'NO') {
        await connection.query('ALTER TABLE pedidos MODIFY COLUMN direccion_envio_id INT NULL');
    }

    if (!alreadyOk && fks.length > 0) {
        await connection.query(
            `ALTER TABLE pedidos
             ADD CONSTRAINT fk_pedidos_direccion_envio
             FOREIGN KEY (direccion_envio_id) REFERENCES direcciones(id) ON DELETE SET NULL`
        );
    } else if (fks.length === 0) {
        const [check] = await connection.query(
            `SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'pedidos' AND CONSTRAINT_NAME = 'fk_pedidos_direccion_envio'`
        );
        if (check.length === 0) {
            await connection.query(
                `ALTER TABLE pedidos
                 ADD CONSTRAINT fk_pedidos_direccion_envio
                 FOREIGN KEY (direccion_envio_id) REFERENCES direcciones(id) ON DELETE SET NULL`
            );
        }
    }
};

const ensureUserSchema = async (connection) => {
    const [usernameColumn] = await connection.query("SHOW COLUMNS FROM usuarios LIKE 'username'");
    if (usernameColumn.length === 0) {
        await connection.query('ALTER TABLE usuarios ADD COLUMN username VARCHAR(20) NULL AFTER role_id');
    }

    await connection.query("UPDATE usuarios SET username = CONCAT('user_', id) WHERE username IS NULL OR username = ''");
    await connection.query('ALTER TABLE usuarios MODIFY COLUMN username VARCHAR(20) NOT NULL');

    const ensureIndex = async (indexName, definitionSql) => {
        const [indexRows] = await connection.query('SHOW INDEX FROM usuarios WHERE Key_name = ?', [indexName]);
        if (indexRows.length === 0) {
            await connection.query(definitionSql);
        }
    };

    await ensureIndex('uk_usuarios_username', 'ALTER TABLE usuarios ADD UNIQUE KEY uk_usuarios_username (username)');
    await ensureIndex('uk_usuarios_dni', 'ALTER TABLE usuarios ADD UNIQUE KEY uk_usuarios_dni (dni)');
    await ensureIndex('uk_usuarios_telefono', 'ALTER TABLE usuarios ADD UNIQUE KEY uk_usuarios_telefono (telefono)');
};

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        try {
            await ensureUserSchema(connection);
        } catch (userErr) {
            console.warn('Aviso migracion usuarios (el servidor sigue):', userErr.message);
        }
        await ensureCheckoutSchema(connection);
        console.log('✅ Conexión exitosa a MySQL - marketplus_db');
        console.log('✅ Esquema validado (usuarios, direcciones, checkout)');
        connection.release();
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.code || '', error.message || 'Servicio no disponible');
        console.error('   → Verifica que MySQL esté INICIADO (XAMPP o servicio MySQL80)');
        console.error('   → Revisa DB_PASSWORD en backend/.env');
        console.error('   → Crea la BD: mysql -u root -p < database/marketplus.sql');
    }
};

module.exports = { pool, testConnection, ensureAddressDeletePolicy };
