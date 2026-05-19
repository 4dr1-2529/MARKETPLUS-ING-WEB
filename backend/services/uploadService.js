const fs = require('fs').promises;
const path = require('path');

const uploadService = {
    saveFile: async (file, folder = 'products') => {
        const uploadDir = path.join(__dirname, '..', 'uploads', folder);
        
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        
        await fs.writeFile(filePath, file.buffer);
        
        return path.join('uploads', folder, fileName);
    },

    deleteFile: async (filePath) => {
        const fullPath = path.join(__dirname, '..', filePath);
        try {
            await fs.access(fullPath);
            await fs.unlink(fullPath);
        } catch {
            // File doesn't exist, nothing to do
        }
    }
};

module.exports = uploadService;
