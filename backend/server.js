const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

testConnection();

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  MARKETPLUS API - Backend Server`);
    console.log(`========================================`);
    console.log(`  Puerto: ${PORT}`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`========================================\n`);
});
