/**
 * Importa productos tecnológicos desde DummyJSON (como PokeAPI pero para tech).
 * Uso: npm run sync:dummyjson
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { pool } = require('../config/database');

const USD_TO_PEN = 3.75;

/** Categoría API DummyJSON → categoría MarketPlus */
const CATEGORY_MAP = [
    { api: 'smartphones', slug: 'celulares-smartphones', nombre: 'Celulares y Smartphones', desc: 'Teléfonos inteligentes', limit: 12 },
    { api: 'laptops', slug: 'laptops-computadoras', nombre: 'Laptops y Computadoras', desc: 'Laptops para trabajo y gaming', limit: 12 },
    { api: 'tablets', slug: 'tablets', nombre: 'Tablets', desc: 'Tablets para estudio y entretenimiento', limit: 12 },
    { api: 'mobile-accessories', slug: 'accesorios', nombre: 'Accesorios', desc: 'Cargadores, fundas, cables y más', limit: 12 },
    { api: 'mens-watches', slug: 'smartwatch-wearables', nombre: 'Smartwatch y Wearables', desc: 'Relojes inteligentes', limit: 10 },
    { api: 'womens-watches', slug: 'smartwatch-wearables', nombre: 'Smartwatch y Wearables', desc: 'Relojes inteligentes', limit: 10 }
];

function slugify(text) {
    return String(text)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function makeProductSlug(product) {
    const base = slugify(product.title);
    return `dj-${product.id}-${base}`.slice(0, 180);
}

function toSoles(usd) {
    return Math.round(Number(usd) * USD_TO_PEN * 100) / 100;
}

async function fetchCategoryProducts(category, limit) {
    const https = require('https');
    const url = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
    // Agent local: evita error SSL en algunos entornos Windows/XAMPP
    const agent = new https.Agent({ rejectUnauthorized: false });
    return new Promise((resolve, reject) => {
        https.get(url, { agent, headers: { Accept: 'application/json' } }, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        return reject(new Error(`DummyJSON ${category}: HTTP ${res.statusCode}`));
                    }
                    const data = JSON.parse(body);
                    resolve(data.products || []);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function ensureCategory(conn, { slug, nombre, desc }) {
    const [rows] = await conn.query('SELECT id FROM categorias WHERE slug = ?', [slug]);
    if (rows.length) {
        await conn.query(
            "UPDATE categorias SET nombre = ?, descripcion = ?, estado = 'activo' WHERE slug = ?",
            [nombre, desc, slug]
        );
        return rows[0].id;
    }
    const [r] = await conn.query(
        'INSERT INTO categorias (nombre, slug, descripcion, estado) VALUES (?, ?, ?, ?)',
        [nombre, slug, desc, 'activo']
    );
    return r.insertId;
}

async function ensureBrand(conn, brandName) {
    const name = (brandName || 'Genérico').trim().slice(0, 100);
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
        const [again] = await conn.query('SELECT id FROM marcas WHERE nombre = ?', [name]);
        return again[0]?.id || 1;
    }
}

async function upsertProduct(conn, { product, categoriaId, marcaId, proveedorId }) {
    const slug = makeProductSlug(product);
    const nombre = product.title.slice(0, 200);
    const descripcion = (product.description || '').slice(0, 2000);
    const precio = toSoles(product.price);
    const dcto = Math.round(product.discountPercentage || 0);
    const precioOferta = dcto > 0 ? Math.round(precio * (1 - dcto / 100) * 100) / 100 : null;
    const imagenPrincipal = product.thumbnail || (product.images && product.images[0]) || '';
    const imagenes = JSON.stringify(product.images || []);
    const sku = `DJ-${product.id}`;
    const destacado = (product.rating || 0) >= 4.5;
    const ventas = Math.floor(Math.random() * 200) + 10;

    const [existing] = await conn.query('SELECT id FROM productos WHERE slug = ?', [slug]);

    if (existing.length) {
        await conn.query(
            `UPDATE productos SET nombre=?, descripcion=?, precio=?, precio_oferta=?, descuento_porcentaje=?,
             imagen_principal=?, imagenes=?, marca_id=?, categoria_id=?, destacado=?, estado='activo' WHERE id=?`,
            [nombre, descripcion, precio, precioOferta, dcto, imagenPrincipal, imagenes, marcaId, categoriaId, destacado, existing[0].id]
        );
        return { id: existing[0].id, slug, updated: true };
    }

    const [ins] = await conn.query(
        `INSERT INTO productos (categoria_id, marca_id, proveedor_id, nombre, slug, descripcion, precio, precio_oferta,
         descuento_porcentaje, sku, garantia_meses, estado, destacado, nuevo, imagen_principal, imagenes, ventas)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 12, 'activo', ?, 1, ?, ?, ?)`,
        [categoriaId, marcaId, proveedorId, nombre, slug, descripcion, precio, precioOferta, dcto, sku, destacado, imagenPrincipal, imagenes, ventas]
    );

    const productoId = ins.insertId;
    const [inv] = await conn.query('SELECT id FROM inventario WHERE producto_id = ?', [productoId]);
    if (!inv.length) {
        await conn.query(
            'INSERT INTO inventario (producto_id, stock, stock_minimo, stock_maximo, ubicacion) VALUES (?, 40, 5, 150, ?)',
            [productoId, `API-${slug}`]
        );
    }
    return { id: productoId, slug, updated: false };
}

async function main() {
    console.log('🔄 Sincronizando catálogo desde DummyJSON...\n');
    const conn = await pool.getConnection();

    try {
        const [prov] = await conn.query("SELECT id FROM proveedores WHERE estado='activo' LIMIT 1");
        const proveedorId = prov[0]?.id || 1;

        let totalInserted = 0;
        let totalUpdated = 0;
        const processedCategories = new Set();

        for (const cat of CATEGORY_MAP) {
            const catKey = cat.slug;
            if (processedCategories.has(`${catKey}-${cat.api}`)) continue;

            console.log(`📦 ${cat.nombre} ← dummyjson/${cat.api}`);

            const categoriaId = await ensureCategory(conn, cat);
            const products = await fetchCategoryProducts(cat.api, cat.limit);

            for (const p of products) {
                const marcaId = await ensureBrand(conn, p.brand);
                const result = await upsertProduct(conn, {
                    product: p,
                    categoriaId,
                    marcaId,
                    proveedorId
                });
                if (result.updated) totalUpdated++;
                else totalInserted++;
            }

            processedCategories.add(`${catKey}-${cat.api}`);
            console.log(`   ✓ ${products.length} productos\n`);
        }

        // Activar categorías con productos
        await conn.query(`
            UPDATE categorias c SET c.estado = 'activo'
            WHERE EXISTS (SELECT 1 FROM productos p WHERE p.categoria_id = c.id AND p.estado = 'activo')
        `);

        const [summary] = await conn.query(`
            SELECT c.nombre, c.slug, COUNT(p.id) AS total
            FROM categorias c
            LEFT JOIN productos p ON p.categoria_id = c.id AND p.estado = 'activo'
            WHERE c.estado = 'activo'
            GROUP BY c.id ORDER BY total DESC
        `);

        console.log('✅ Sincronización completada');
        console.log(`   Nuevos: ${totalInserted} | Actualizados: ${totalUpdated}\n`);
        console.log('📊 Catálogo activo:');
        summary.forEach((r) => console.log(`   ${r.nombre}: ${r.total} productos`));
    } finally {
        conn.release();
        await pool.end();
    }
}

main().catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
