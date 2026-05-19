/**
 * Carga catálogo completo: 20 categorías × 15 productos
 * Uso: npm run seed:catalogo
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { pool } = require('../config/database');
const { CATALOG } = require('./lib/catalogo-definiciones');

function slugify(text) {
    return String(text)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 170);
}

async function ensureBrand(conn, marca) {
    const name = (marca || 'Genérico').trim();
    const slug = slugify(name) || 'generico';
    const [rows] = await conn.query('SELECT id FROM marcas WHERE slug = ?', [slug]);
    if (rows.length) return rows[0].id;
    try {
        const [r] = await conn.query(
            "INSERT INTO marcas (nombre, slug, pais_origen, estado) VALUES (?, ?, 'Internacional', 'activo')",
            [name, slug]
        );
        return r.insertId;
    } catch {
        const [a] = await conn.query('SELECT id FROM marcas WHERE slug = ?', [slug]);
        return a[0]?.id || 1;
    }
}

async function main() {
    console.log('🛒 Cargando catálogo MarketPlus (20 categorías × 15 productos)...\n');
    const conn = await pool.getConnection();

    try {
        const [prov] = await conn.query("SELECT id FROM proveedores WHERE estado='activo' LIMIT 1");
        const proveedorId = prov[0]?.id || 1;

        const validSlugs = CATALOG.map((c) => c.slug);

        // Desactivar catálogo anterior
        await conn.query("UPDATE productos SET estado = 'inactivo'");
        await conn.query(
            `UPDATE categorias SET estado = 'inactivo' WHERE slug NOT IN (${validSlugs.map(() => '?').join(',')})`,
            validSlugs
        );

        let total = 0;

        for (const cat of CATALOG) {
            let [catRows] = await conn.query('SELECT id FROM categorias WHERE slug = ?', [cat.slug]);
            let categoriaId;
            if (catRows.length) {
                categoriaId = catRows[0].id;
                await conn.query(
                    "UPDATE categorias SET nombre = ?, descripcion = ?, estado = 'activo' WHERE id = ?",
                    [cat.nombre, cat.desc, categoriaId]
                );
            } else {
                const [ins] = await conn.query(
                    'INSERT INTO categorias (nombre, slug, descripcion, estado) VALUES (?, ?, ?, ?)',
                    [cat.nombre, cat.slug, cat.desc, 'activo']
                );
                categoriaId = ins.insertId;
            }

            console.log(`📁 ${cat.nombre} (${cat.productos.length} productos)`);

            for (const p of cat.productos) {
                const slug = `mp-${cat.slug}-${slugify(p.nombre)}`.slice(0, 180);
                const marcaId = await ensureBrand(conn, p.marca);
                const dcto = p.dcto || 0;
                const precioOferta = p.oferta || null;
                const imagenes = JSON.stringify([p.img]);

                const [ex] = await conn.query('SELECT id FROM productos WHERE slug = ?', [slug]);
                if (ex.length) {
                    await conn.query(
                        `UPDATE productos SET categoria_id=?, marca_id=?, nombre=?, descripcion=?, precio=?, precio_oferta=?,
                         descuento_porcentaje=?, imagen_principal=?, imagenes=?, estado='activo', destacado=? WHERE id=?`,
                        [categoriaId, marcaId, p.nombre, p.desc, p.precio, precioOferta, dcto, p.img, imagenes,
                            p.precio > 2000, ex[0].id]
                    );
                } else {
                    const [ins] = await conn.query(
                        `INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta,
                         descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal, imagenes, ventas)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 12, 'activo', ?, 1, ?, ?, ?)`,
                        [categoriaId, marcaId, proveedorId, p.nombre, slug, p.desc, p.precio, precioOferta, dcto,
                            slug.replace(/-/g, '').slice(0, 48).toUpperCase(), p.precio > 2000, p.img, imagenes, Math.floor(Math.random() * 150) + 5]
                    );
                    const pid = ins.insertId;
                    const [inv] = await conn.query('SELECT id FROM inventario WHERE producto_id = ?', [pid]);
                    if (!inv.length) {
                        await conn.query(
                            'INSERT INTO inventario (producto_id, stock, stock_minimo, stock_maximo, ubicacion) VALUES (?, 45, 5, 120, ?)',
                            [pid, cat.slug]
                        );
                    }
                }
                total++;
            }
        }

        const [summary] = await conn.query(`
            SELECT c.nombre, c.slug, COUNT(p.id) AS n
            FROM categorias c
            LEFT JOIN productos p ON p.categoria_id = c.id AND p.estado = 'activo'
            WHERE c.estado = 'activo'
            GROUP BY c.id ORDER BY c.nombre
        `);

        console.log(`\n✅ ${total} productos cargados en ${CATALOG.length} categorías\n`);
        summary.forEach((r) => console.log(`   ${r.nombre}: ${r.n} productos`));

        console.log('\n🖼️  Ajustando imágenes por tipo de producto...');
        const { resolveProductImage, getCategoryCoverImage } = require('./lib/product-image-resolver');
        const [allProducts] = await conn.query(`
            SELECT p.id, p.nombre, c.slug AS categoria_slug, m.nombre AS marca
            FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            JOIN marcas m ON p.marca_id = m.id
            WHERE p.estado = 'activo' ORDER BY c.slug, p.id
        `);
        let lastCat = '';
        let idx = 0;
        for (const p of allProducts) {
            if (p.categoria_slug !== lastCat) { lastCat = p.categoria_slug; idx = 0; }
            const img = resolveProductImage(p.categoria_slug, p.nombre, p.marca, idx);
            await conn.query('UPDATE productos SET imagen_principal = ?, imagenes = ? WHERE id = ?',
                [img, JSON.stringify([img]), p.id]);
            idx++;
        }
        for (const cat of CATALOG) {
            const cover = getCategoryCoverImage(cat.slug);
            await conn.query('UPDATE categorias SET imagen = ?, descripcion = ? WHERE slug = ?',
                [cover, cat.desc, cat.slug]);
        }
    } finally {
        conn.release();
        await pool.end();
    }
}

main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
});
