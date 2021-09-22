// @ts-nocheck
const jwt = require('jsonwebtoken');
const getDB = require('../../config/getDB');
/**
 *
 * @module Helpers
 */
/**
 * Middleware para verificar que un usuario tiene permisos para editar/eliminar una entrada/vivienda.
 * @param {*} req Se obtiene de la cabecera de autorización el id del usuario logueado y el id de la propiedad a editar
 * @param {*} res No se obtiene respuesta del servidor en este middleware, a no ser que haya un error.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const canEdit = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id de la propiedad a editar en los path params.
    const { idProperty } = req.params;

    // Obtenemos el id del usuario dueño de esa propiedad
    const [owner] = await connection.query(
      `
    SELECT idUser FROM properties WHERE idProperty = ?
    `,
      [idProperty]
    );

    // Comparamos los id y si son diferentes lanzamos error ó si el usuario no es admin y no coinciden también.
    if (
      owner[0].idUser !== req.userAuth.idUser &&
      req.userAuth.role !== 'admin'
    ) {
      const error = new Error('No tienes suficientes permisos.');
      error.httpStatus = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = canEdit;
