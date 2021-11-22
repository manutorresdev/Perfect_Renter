require('dotenv').config()

const mysql = require('mysql2/promise')

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_DATABASE_TEST,
  NODE_ENV
} = process.env
let pool
/**
 * @module Database
 */
/**
 * Conexión a base de datos.
 * @name DatabaseConnection
 * @returns {Promise} Devuelve una conexión a la base de datos.
 */
const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      multipleStatements: true,
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: NODE_ENV === 'test' ? MYSQL_DATABASE_TEST : MYSQL_DATABASE,
      timezone: 'Z'
    })
  }

  return await pool.getConnection()
}

module.exports = getDB
