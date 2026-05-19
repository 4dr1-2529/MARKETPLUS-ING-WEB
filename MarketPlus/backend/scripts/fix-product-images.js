/**
 * Corrige imágenes de productos y categorías según tipo real del producto.
 * Uso: npm run fix:images
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { pool } = require('../config/database');
const { resolveProductImage, getCategoryCoverImage } = require('./lib/product-image-resolver');

async function main() {
    console.log('🖼️  Corrigiendo imágenes del catálogo...\n');
    const conn = await pool.getConnection();
    try {
        const [products] = await conn.query(`
            SELECT p.id, p.nombre, c.slug AS categoria_slug, m.nombre AS marca
            FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            JOIN marcas m ON p.marca_id = m.id
            WHERE p.estado = 'activo'
            ORDER BY c.slug ASC, p.id ASC
        `);

        let lastCat = '';
        let idx = 0;
        let updated = 0;

        for (const p of products) {
            if (p.categoria_slug !== lastCat) {
                lastCat = p.categoria_slug;
                idx = 0;
            }
            const img = resolveProductImage(p.categoria_slug, p.nombre, p.marca, idx);
            await conn.query(
                'UPDATE productos SET imagen_principal = ?, imagenes = ? WHERE id = ?',
                [img, JSON.stringify([img]), p.id]
            );
            idx++;
            updated++;
        }

        const [cats] = await conn.query("SELECT id, slug, nombre FROM categorias WHERE estado = 'activo'");
        for (const c of cats) {
            const cover = getCategoryCoverImage(c.slug);
            if (cover) {
                await conn.query('UPDATE categorias SET imagen = ? WHERE id = ?', [cover, c.id]);
            }
        }

        console.log(`✅ ${updated} productos actualizados`);
        console.log(`✅ ${cats.length} categorías con imagen de portada\n`);
    } finally {
        conn.release();
        await pool.end();
    }
}

main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
});
