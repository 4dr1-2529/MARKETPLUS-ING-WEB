const { pool } = require('../config/database');

const getFavorites = async (req, res) => {
    try {
        const [favorites] = await pool.query(
            'SELECT f.id, f.creado_en, p.id as producto_id, p.nombre, p.slug, p.precio, p.precio_oferta, p.imagen_principal, c.nombre as categoria, m.nombre as marca FROM favoritos f JOIN productos p ON f.producto_id = p.id JOIN categorias c ON p.categoria_id = c.id JOIN marcas m ON p.marca_id = m.id WHERE f.usuario_id = ? ORDER BY f.creado_en DESC',
            [req.user.id]
        );
        res.json({ success: true, data: favorites });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener favoritos', error: error.message });
    }
};

const addFavorite = async (req, res) => {
    try {
        const { producto_id } = req.body;
        const [existing] = await pool.query('SELECT id FROM favoritos WHERE usuario_id = ? AND producto_id = ?', [req.user.id, producto_id]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Producto ya esta en favoritos' });
        }
        await pool.query('INSERT INTO favoritos (usuario_id, producto_id) VALUES (?, ?)', [req.user.id, producto_id]);
        res.json({ success: true, message: 'Producto agregado a favoritos' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar favorito', error: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        await pool.query('DELETE FROM favoritos WHERE usuario_id = ? AND producto_id = ?', [req.user.id, req.params.productId]);
        res.json({ success: true, message: 'Producto eliminado de favoritos' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar favorito', error: error.message });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
