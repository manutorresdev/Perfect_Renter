// @ts-nocheck
const getDB = require('../../config/getDB');
const { deletePhoto } = require('../../libs/helpers');
/**
 * @module Entries
 */
/**
 * Middleware para eliminar una foto de un alquiler
 * @param {*} req Como "requests", se requiere el id del usuario que solicita la petición y el id de la foto que se quiere eliminar
 * @param {*} res El servidor lanza como respuesta que la foto ha sido eliminado
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const deletePropertyPhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    //obtener id de la propiedad y de la photo
    const { idProperty } = req.params;
    const { idPhoto } = req.params;

    //comprobamos que la foto existe

    const [photo] = await connection.query(
      `SELECT name FROM photos WHERE idPhoto = ? AND idProperty = ?`,
      [idPhoto, idProperty]
    );

    // Si la foto no existe lanzamos un error.
    if (photo.length < 1) {
      const error = new Error('La foto no existe');
      error.httpStatus = 404;
      throw error;
    }

    //Borar la foto del servidor con la función deletePhoto de helpers

    await deletePhoto(photo[0].name);

    //Borramos la foto de la base de datos.

    await connection.query(
      `DELETE FROM photos WHERE idPhoto = ? AND idProperty = ?`,
      [idPhoto, idProperty]
    );

    res.send({
      status: 'ok',
      message: 'Foto eliminada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePropertyPhoto;
