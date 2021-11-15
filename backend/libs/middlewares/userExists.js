// @ts-nocheck
const getDB = require('../../config/getDB');
/**
 *
 * @module Helpers
 */
/**
 * Middleware para verificar la existencia de un usuario en la base de datos.
 * @param {*} req Como "request", se obtiene el id del usuario a verificar y comprobamos si existe posteriormente.
 * @param {*} res No se obtiene respuesta del servidor en este middleware, a no ser que haya un error.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el usuario.
    const [user] = await connection.query(
      `SELECT idUser FROM users WHERE idUser = ? AND deleted = false`,
      [idUser]
    );

    // Si el usuario no existe lanzamos un error.
    if (user.length < 1) {
      const error = new Error('El usuario no existe.');
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
