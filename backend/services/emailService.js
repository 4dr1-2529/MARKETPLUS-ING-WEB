const { pool } = require('../config/database');

const emailService = {
    sendWelcomeEmail: async (user) => {
        console.log(`[EMAIL] Bienvenido ${user.nombres} (${user.email})`);
        return true;
    },

    sendOrderConfirmation: async (order, user) => {
        console.log(`[EMAIL] Pedido ${order.numero_pedido} confirmado para ${user.email}`);
        return true;
    },

    sendPasswordReset: async (user, token) => {
        console.log(`[EMAIL] Reset password para ${user.email} - Token: ${token}`);
        return true;
    },

    sendOrderStatusUpdate: async (order, user) => {
        console.log(`[EMAIL] Estado del pedido ${order.numero_pedido} actualizado a ${order.estado}`);
        return true;
    }
};

module.exports = emailService;
