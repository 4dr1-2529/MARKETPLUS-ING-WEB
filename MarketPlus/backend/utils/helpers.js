const generateOrderNumber = (): string => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `MP-${year}-${random}`;
};

const calculateIGV = (amount: number): number => {
    return amount * 0.18;
};

const calculateTotal = (subtotal: number, discount: number = 0, shipping: number = 0): number => {
    const subtotalWithDiscount = subtotal - discount;
    const igv = calculateIGV(subtotalWithDiscount);
    return subtotalWithDiscount + igv + shipping;
};

const getShippingCost = (subtotal: number): number => {
    return subtotal > 500 ? 0 : 15;
};

const maskEmail = (email: string): string => {
    const [user, domain] = email.split('@');
    const maskedUser = user.substring(0, 2) + '***' + user.substring(user.length - 1);
    return `${maskedUser}@${domain}`;
};

export { generateOrderNumber, calculateIGV, calculateTotal, getShippingCost, maskEmail };
