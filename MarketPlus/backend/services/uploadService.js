const { pool } = require('../config/database');

const uploadService = {
    saveFile: async (file, folder = 'products') => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const path = `uploads/${folder}/${fileName}`;
        await file.mv(path);
        return path;
    },

    deleteFile: async (filePath) => {
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = uploadService;
