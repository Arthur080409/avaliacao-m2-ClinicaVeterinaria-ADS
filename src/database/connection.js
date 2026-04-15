require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco realziada');
    client.release();
  } catch (error) {
    console.error('Erro ao conectar com o banco', error.message);
    process.exit(1);
  }
})();

module.exports = pool;
