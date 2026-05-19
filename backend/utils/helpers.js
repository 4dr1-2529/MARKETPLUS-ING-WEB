const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `MP-${year}-${random}`;
};

const calculateIGV = (amount) => {
    return amount * 0.18;
};

const calculateTotal = (subtotal, discount = 0, shipping = 0) => {
    const subtotalWithDiscount = subtotal - discount;
    const igv = calculateIGV(subtotalWithDiscount);
    return subtotalWithDiscount + igv + shipping;
};

const getShippingCost = (subtotal) => {
    return subtotal > 500 ? 0 : 15;
};

const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    const maskedUser = user.substring(0, 2) + '***' + user.substring(user.length - 1);
    return `${maskedUser}@${domain}`;
};

module.exports = { generateOrderNumber, calculateIGV, calculateTotal, getShippingCost, maskEmail };
