const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:2626',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization']
}));

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:2626');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Max-Age', '3600');
        return res.sendStatus(200);
    }
    next();
});

const isProduction = process.env.NODE_ENV === 'production';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isProduction ? 300 : 5000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Demasiadas solicitudes, intenta mas tarde' },
    skip: (req) => req.method === 'OPTIONS'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isProduction ? 30 : 200,
    message: { success: false, message: 'Demasiados intentos de acceso, intenta mas tarde' }
});

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'API OK' });
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const { pool } = require('./config/database');
app.locals.pool = pool;

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenido a MarketPlus API',
        version: '1.0.0',
        docs: 'http://localhost:3001/api/products',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            categories: '/api/categories',
            brands: '/api/brands',
            cart: '/api/cart',
            orders: '/api/orders',
            favorites: '/api/favorites',
            addresses: '/api/addresses',
            reviews: '/api/reviews',
            notifications: '/api/notifications',
            coupons: '/api/coupons',
            admin: '/api/admin'
        }
    });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/coupons', require('./routes/coupons'));

app.use((req, res) => {
    console.log(`404 - ${req.method} ${req.originalUrl}`);
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
});

module.exports = app;
