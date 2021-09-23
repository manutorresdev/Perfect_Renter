require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASEPROVINCES } =
  process.env;
let pool;
/**
 * @module Database
 */
/**
 * Conexión a base de datos online.
 * @name OnlineDatabaseConnection
 * @returns {Promise} Devuelve una conexión a la base de datos remota.
 */
const getPRDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASEPROVINCES,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

module.exports = getPRDB;
