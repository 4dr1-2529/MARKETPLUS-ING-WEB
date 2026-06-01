const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { pool } = require('../config/database');

const getAll = async (req, res) => {
    try {
        const [coupons] = await pool.query(
            "SELECT * FROM cupones WHERE estado = 'activo' AND CURDATE() BETWEEN fecha_inicio AND fecha_fin ORDER BY valor DESC",
            []
        );
        res.json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener cupones', error: error.message });
    }
};

const validate = async (req, res) => {
    try {
        const codigo = req.body.codigo || req.body.code;
        const subtotal = Number(req.body.subtotal || 0);
        if (!codigo) {
            return res.status(400).json({ success: false, message: 'Codigo de cupon requerido' });
        }
        
        const [coupons] = await pool.query(
            "SELECT * FROM cupones WHERE codigo = ? AND estado = 'activo' AND CURDATE() BETWEEN fecha_inicio AND fecha_fin",
            [codigo]
        );

        if (coupons.length === 0) {
            return res.status(404).json({ success: false, message: 'Cupon no encontrado o expirado' });
        }

        const coupon = coupons[0];

        if (subtotal < coupon.minimo_compra) {
            return res.status(400).json({ 
                success: false, 
                message: `Compra minima requerida: S/ ${coupon.minimo_compra.toFixed(2)}` 
            });
        }

        if (coupon.usos_maximos && coupon.usos_actuales >= coupon.usos_maximos) {
            return res.status(400).json({ success: false, message: 'Cupon sin usos disponibles' });
        }

        let discount = coupon.tipo === 'porcentaje' 
            ? (subtotal * coupon.valor / 100) 
            : coupon.valor;

        if (coupon.maximo_descuento && discount > coupon.maximo_descuento) {
            discount = coupon.maximo_descuento;
        }

        res.json({ 
            success: true, 
            data: { 
                coupon: { codigo: coupon.codigo, descripcion: coupon.descripcion, tipo: coupon.tipo, valor: coupon.valor },
                discount: parseFloat(discount.toFixed(2)),
                descuento: parseFloat(discount.toFixed(2)),
                total: parseFloat((subtotal - discount).toFixed(2))
            } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al validar cupon' });
    }
};

const apply = async (req, res) => {
    // Backward-compatible alias expected by older frontend service.
    req.body = { ...req.body, subtotal: req.body.subtotal || 0 };
    return validate(req, res);
};

router.get('/', getAll);
router.post('/validate', authMiddleware, validate);
router.post('/apply', authMiddleware, apply);

module.exports = router;
