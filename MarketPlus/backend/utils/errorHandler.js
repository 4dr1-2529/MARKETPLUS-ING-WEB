const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Error de validacion',
            errors: err.details
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: 'No autorizado'
        });
    }

    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'El registro ya existe'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
};

module.exports = { errorHandler, notFoundHandler };
