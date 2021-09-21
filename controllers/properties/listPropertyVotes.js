// @ts-nocheck
const getDB = require('../../config/getDB');
/**
 * @module Entries
 */
/**
 * Middleware para listar las valoraciones de un alquiler
 * @param {*} req Como request, se requiere el id de la propiedad a mostrar
 * @param {*} res Como respuesta, obtienes un objeto con los datos de las valoraciones
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const listPropertyVotes = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idProperty } = req.params;

    // Obtenemos los votos del usuario a visualizar
    let [votes] = await connection.query(
      `
      SELECT voteValue, commentProperty
      FROM votes
      WHERE idProperty = ?
      `,
      [idProperty]
    );

    // Si no hay votos, damos un valor vacío.
    if (votes.length < 1) {
      votes = 'Aún no tiene valoraciones.';
    }

    res.send({
      status: 'ok',
      Valoraciones: votes,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listPropertyVotes;
