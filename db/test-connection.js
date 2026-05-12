const { loadEnvFile } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

const pool = require('./config');

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    console.log('Conexion exitosa a PostgreSQL');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Error al conectar con PostgreSQL');
    console.error(error.message);
  } finally {
    await pool.end();
  }
};

testConnection();
