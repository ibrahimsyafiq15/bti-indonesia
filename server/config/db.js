const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bti_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('\n❌ MySQL Connection Error:', error.message);
    console.log('\n📌 Pastikan MySQL sudah berjalan:');
    console.log('   1. Jalankan Laragon dan start MySQL');
    console.log('   2. Atau jalankan XAMPP/WAMP');
    console.log('   3. Cek konfigurasi di server/.env\n');
    return false;
  }
};

// Query helper
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Transaction helper
const transaction = async (callback) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  pool,
  testConnection,
  query,
  transaction
};
