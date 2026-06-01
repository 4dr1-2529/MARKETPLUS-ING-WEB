const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,20}$/;

const validateRegistration = (req, res, next) => {
    const { username, nombres, apellidos, email, password, dni, telefono } = req.body;
    const errors = [];

    if (!username || !USERNAME_REGEX.test(String(username).trim())) {
        errors.push({ field: 'username', message: 'Nombre de usuario invalido (4-20, letras, numeros, punto, guion o guion bajo)' });
    }
    if (!nombres || nombres.trim().length < 2) errors.push({ field: 'nombres', message: 'Nombres requeridos (min 2 caracteres)' });
    if (nombres && !NAME_REGEX.test(nombres.trim())) errors.push({ field: 'nombres', message: 'Nombres solo deben contener letras y espacios' });
    if (!apellidos || apellidos.trim().length < 2) errors.push({ field: 'apellidos', message: 'Apellidos requeridos (min 2 caracteres)' });
    if (apellidos && !NAME_REGEX.test(apellidos.trim())) errors.push({ field: 'apellidos', message: 'Apellidos solo deben contener letras y espacios' });
    if (!email || !EMAIL_REGEX.test(email)) errors.push({ field: 'email', message: 'Email invalido' });
    if (!password || password.length < 8) errors.push({ field: 'password', message: 'Contraseña minima 8 caracteres' });
    if (dni && (dni.length !== 8 || !/^\d+$/.test(dni))) errors.push({ field: 'dni', message: 'El DNI debe tener exactamente 8 digitos' });
    if (telefono && (telefono.length !== 9 || !/^\d+$/.test(telefono))) errors.push({ field: 'telefono', message: 'El telefono debe tener exactamente 9 digitos' });

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const identifier = String(req.body.identifier || req.body.email || '').trim();
    const { password } = req.body;
    const errors = [];

    if (!identifier) errors.push({ field: 'identifier', message: 'Email o nombre de usuario requerido' });
    if (identifier && /^\d{8,15}$/.test(identifier)) errors.push({ field: 'identifier', message: 'Ingresa email o nombre de usuario, no DNI ni telefono' });
    if (!password) errors.push({ field: 'password', message: 'Contraseña requerida' });

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

const validateProduct = (req, res, next) => {
    const { nombre, categoria_id, marca_id, precio, sku } = req.body;
    const errors = [];

    if (!nombre || nombre.trim().length < 3) errors.push({ field: 'nombre', message: 'Nombre requerido (min 3 caracteres)' });
    if (!categoria_id) errors.push({ field: 'categoria_id', message: 'Categoria requerida' });
    if (!marca_id) errors.push({ field: 'marca_id', message: 'Marca requerida' });
    if (!precio || Number.isNaN(Number(precio)) || Number(precio) <= 0) errors.push({ field: 'precio', message: 'Precio valido requerido' });
    if (!sku) errors.push({ field: 'sku', message: 'SKU requerido' });

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

/** PUT parcial: solo valida los campos enviados en el body */
const validateProductUpdate = (req, res, next) => {
    const { nombre, categoria_id, marca_id, precio, sku } = req.body;
    const errors = [];

    if (nombre !== undefined && (!nombre || String(nombre).trim().length < 3)) {
        errors.push({ field: 'nombre', message: 'Nombre requerido (min 3 caracteres)' });
    }
    if (categoria_id !== undefined && !categoria_id) {
        errors.push({ field: 'categoria_id', message: 'Categoria requerida' });
    }
    if (marca_id !== undefined && !marca_id) {
        errors.push({ field: 'marca_id', message: 'Marca requerida' });
    }
    if (precio !== undefined && (Number.isNaN(Number(precio)) || Number(precio) <= 0)) {
        errors.push({ field: 'precio', message: 'Precio valido requerido' });
    }
    if (sku !== undefined && !sku) {
        errors.push({ field: 'sku', message: 'SKU requerido' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

const validateForgotPassword = (req, res, next) => {
    const { email } = req.body;
    if (!email || !EMAIL_REGEX.test(email)) {
        return res.status(400).json({ success: false, message: 'Email invalido' });
    }
    next();
};

const validateResetPassword = (req, res, next) => {
    const { token, password } = req.body;
    if (!token || typeof token !== 'string' || token.trim().length < 10) {
        return res.status(400).json({ success: false, message: 'Token invalido' });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 8 caracteres' });
    }
    next();
};

const validateProfileUpdate = (req, res, next) => {
    const { username, nombres, apellidos, dni, telefono } = req.body;
    if (username && !USERNAME_REGEX.test(String(username).trim())) {
        return res.status(400).json({ success: false, message: 'Nombre de usuario invalido' });
    }
    if (nombres && (nombres.trim().length < 2 || !NAME_REGEX.test(nombres.trim()))) {
        return res.status(400).json({ success: false, message: 'Nombres invalidos' });
    }
    if (apellidos && (apellidos.trim().length < 2 || !NAME_REGEX.test(apellidos.trim()))) {
        return res.status(400).json({ success: false, message: 'Apellidos invalidos' });
    }
    if (dni && !/^\d{8}$/.test(dni)) {
        return res.status(400).json({ success: false, message: 'El DNI debe tener exactamente 8 digitos' });
    }
    if (telefono && !/^\d{9}$/.test(telefono)) {
        return res.status(400).json({ success: false, message: 'El telefono debe tener exactamente 9 digitos' });
    }
    next();
};

const validateAddress = (req, res, next) => {
    const { tipo, destinatario, direccion_linea1, departamento, provincia, distrito, telefono, referencia, dni_contacto } = req.body;
    const tipoEntrega = tipo || 'domicilio';

    if (!['domicilio', 'recojo_tienda'].includes(tipoEntrega)) {
        return res.status(400).json({ success: false, message: 'Tipo de entrega invalido' });
    }
    if (!destinatario || destinatario.trim().length < 3) {
        return res.status(400).json({ success: false, message: 'El nombre del destinatario debe tener al menos 3 caracteres' });
    }
    if (!NAME_REGEX.test(destinatario.trim())) {
        return res.status(400).json({ success: false, message: 'El nombre solo puede contener letras y espacios' });
    }

    if (tipoEntrega === 'domicilio') {
        if (!direccion_linea1 || direccion_linea1.trim().length < 5) {
            return res.status(400).json({ success: false, message: 'La direccion debe tener al menos 5 caracteres' });
        }
        if (!departamento || !provincia || !distrito) {
            return res.status(400).json({ success: false, message: 'Departamento, provincia y distrito son obligatorios' });
        }
        if (!telefono || !/^\d{9}$/.test(String(telefono).trim())) {
            return res.status(400).json({ success: false, message: 'El telefono debe tener exactamente 9 digitos' });
        }
        if (referencia && referencia.length > 120) {
            return res.status(400).json({ success: false, message: 'La referencia no puede superar 120 caracteres' });
        }
    } else {
        const dni = String(dni_contacto || '').trim();
        if (!/^\d{8}$/.test(dni)) {
            return res.status(400).json({ success: false, message: 'El DNI de quien recoge debe tener exactamente 8 digitos' });
        }
        if (!telefono || !/^\d{9}$/.test(String(telefono).trim())) {
            return res.status(400).json({ success: false, message: 'El telefono debe tener exactamente 9 digitos' });
        }
    }
    next();
};

const validateCreateOrder = (req, res, next) => {
    const {
        direccion_id,
        metodo_pago,
        tipo_comprobante,
        comprobante_dni,
        comprobante_nombre,
        comprobante_ruc,
        comprobante_razon_social,
        comprobante_direccion_fiscal,
        datos_pago
    } = req.body;

    if (!direccion_id) {
        return res.status(400).json({ success: false, message: 'Selecciona una direccion de entrega' });
    }
    if (!metodo_pago) {
        return res.status(400).json({ success: false, message: 'Selecciona un metodo de pago' });
    }
    const metodosValidos = ['yape', 'tarjeta_credito', 'tarjeta_visa', 'contra_entrega'];
    if (!metodosValidos.includes(metodo_pago)) {
        return res.status(400).json({ success: false, message: 'Metodo de pago no valido' });
    }
    if (!tipo_comprobante || !['boleta', 'factura'].includes(tipo_comprobante)) {
        return res.status(400).json({ success: false, message: 'Selecciona un comprobante de pago (Boleta o Factura)' });
    }
    if (tipo_comprobante === 'boleta') {
        if (!comprobante_nombre || comprobante_nombre.trim().length < 3 || !NAME_REGEX.test(comprobante_nombre.trim())) {
            return res.status(400).json({ success: false, message: 'Nombre completo invalido para boleta' });
        }
        if (!comprobante_dni || !/^\d{8}$/.test(String(comprobante_dni).trim())) {
            return res.status(400).json({ success: false, message: 'El DNI para boleta debe tener exactamente 8 digitos' });
        }
    } else {
        if (!comprobante_ruc || !/^\d{11}$/.test(String(comprobante_ruc).trim())) {
            return res.status(400).json({ success: false, message: 'El RUC debe tener exactamente 11 digitos' });
        }
        if (!comprobante_razon_social || comprobante_razon_social.trim().length < 3) {
            return res.status(400).json({ success: false, message: 'La razon social debe tener al menos 3 caracteres' });
        }
        if (!comprobante_direccion_fiscal || comprobante_direccion_fiscal.trim().length < 5) {
            return res.status(400).json({ success: false, message: 'La direccion fiscal debe tener al menos 5 caracteres' });
        }
    }

    const pago = datos_pago || {};
    if (metodo_pago === 'tarjeta_credito' || metodo_pago === 'tarjeta_visa') {
        const numero = String(pago.numero_tarjeta || '').replace(/\D/g, '');
        if (numero.length !== 16) {
            return res.status(400).json({ success: false, message: 'El numero de tarjeta debe tener 16 digitos' });
        }
        if (!pago.fecha_vencimiento || !/^\d{2}\/\d{2}$/.test(pago.fecha_vencimiento)) {
            return res.status(400).json({ success: false, message: 'Fecha de vencimiento invalida (MM/AA)' });
        }
        const cvv = String(pago.cvv || '').replace(/\D/g, '');
        if (cvv.length !== 3) {
            return res.status(400).json({ success: false, message: 'El CVV debe tener 3 digitos' });
        }
        if (!pago.titular || pago.titular.trim().length < 3 || !NAME_REGEX.test(pago.titular.trim())) {
            return res.status(400).json({ success: false, message: 'Nombre del titular invalido' });
        }
    } else if (metodo_pago === 'yape') {
        if (!pago.telefono_yape || !/^\d{9}$/.test(String(pago.telefono_yape).trim())) {
            return res.status(400).json({ success: false, message: 'Telefono Yape invalido (9 digitos)' });
        }
        if (!pago.codigo_operacion || String(pago.codigo_operacion).trim().length < 6) {
            return res.status(400).json({ success: false, message: 'Codigo de operacion Yape invalido (minimo 6 caracteres)' });
        }
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateProduct,
    validateProductUpdate,
    validateForgotPassword,
    validateResetPassword,
    validateProfileUpdate,
    validateAddress,
    validateCreateOrder
};
