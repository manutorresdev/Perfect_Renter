// @ts-nocheck
const getDB = require('../../config/getDB');
const { deletePhoto } = require('../../libs/helpers');
/**
 * @module Entries
 */
/**
 * Middleware para eliminar un alquiler de la base de datos
 * @param {*} req Como "requests", se requiere el id del usuario que solicita la petición y el id del alquiler que se quiere eliminar
 * @param {*} res El servidor lanza como respuesta que el alquiler ha sido eliminado
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const deleteProperty = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos id del alquiler que queremos borrar
    const { idProperty } = req.params;

    // Obtenemos el nombre de las fotos
    const [photos] = await connection.query(
      `SELECT name FROM photos WHERE idProperty = ?`,
      [idProperty]
    );

    // Eliminamos las fotos del servidor y la base de datos.
    for (const photo of photos) {
      deletePhoto(photo.name);
    }

    // Eliminamos las reservas asociadas a esa propiedad.
    await connection.query(
      `
    DELETE FROM bookings WHERE idProperty = ?
    `,
      [idProperty]
    );

    // Eliminamos la propiedad de la base de datos.
    await connection.query(
      `
    DELETE FROM properties WHERE idProperty = ?
    `,
      [idProperty]
    );
    res.send({
      status: 'ok',
      message: 'Propiedad eliminada.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteProperty;
