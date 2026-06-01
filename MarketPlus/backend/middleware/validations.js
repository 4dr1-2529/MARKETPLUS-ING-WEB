const validateRegistration = (req, res, next) => {
    const { nombres, apellidos, email, password, dni, telefono } = req.body;
    const errors = [];

    if (!nombres || nombres.trim().length < 2) errors.push({ field: 'nombres', message: 'Nombres requeridos (min 2 caracteres)' });
    if (!apellidos || apellidos.trim().length < 2) errors.push({ field: 'apellidos', message: 'Apellidos requeridos (min 2 caracteres)' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ field: 'email', message: 'Email invalido' });
    if (!password || password.length < 8) errors.push({ field: 'password', message: 'Contraseña minima 8 caracteres' });
    if (dni && (dni.length !== 8 || !/^\d+$/.test(dni))) errors.push({ field: 'dni', message: 'El DNI debe tener exactamente 8 digitos' });
    if (telefono && (telefono.length !== 9 || !/^\d+$/.test(telefono))) errors.push({ field: 'telefono', message: 'El telefono debe tener exactamente 9 digitos' });

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) errors.push({ field: 'email', message: 'Email requerido' });
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
    if (!precio || isNaN(precio) || precio <= 0) errors.push({ field: 'precio', message: 'Precio valido requerido' });
    if (!sku) errors.push({ field: 'sku', message: 'SKU requerido' });

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Error de validacion', errors });
    }
    next();
};

module.exports = { validateRegistration, validateLogin, validateProduct };
