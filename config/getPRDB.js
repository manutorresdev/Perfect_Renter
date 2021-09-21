require('dotenv').config();

const mysql = require('mysql2/promise');

const {
  MYSQL_DATABASEPROVINCES,
  MYSQL_HOSTPROVINCES,
  MYSQL_USERPROVINCES,
  MYSQL_PASSWORDPROVINCES,
} = process.env;

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
      host: MYSQL_HOSTPROVINCES,
      user: MYSQL_USERPROVINCES,
      password: MYSQL_PASSWORDPROVINCES,
      database: MYSQL_DATABASEPROVINCES,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

module.exports = getPRDB;
