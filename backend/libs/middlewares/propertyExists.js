// @ts-nocheck
const getDB = require('../../config/getDB');
/**
 *
 * @module Helpers
 */
/**
 * Middleware para verificar la existencia de una propiedad en la base de datos.
 * @param {*} req Como "request", se obtiene el id de la propiedad para verificar y comprobamos si existe
 * @param {*} res No se obtiene respuesta del servidor en este middleware, a no ser que haya un error
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const propertyExist = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Obtenemos el id de la propiedad
    const { idProperty } = req.params;

    //seleccionamos la propiedad
    const [property] = await connection.query(
      `SELECT * FROM properties WHERE idProperty = ?`,
      [idProperty]
    );

    // si la propiedad no existe enviamos error
    if (property.length < 1) {
      const error = new Error('La vivienda no existe.');
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

module.exports = propertyExist;
