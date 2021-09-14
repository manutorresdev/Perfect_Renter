require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;
/**
 * @module module:Database
 */
/**
 * Conexión a base de datos.
 * @name DatabaseConnection
 * @returns {Promise}
 */
const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

module.exports = getDB;
