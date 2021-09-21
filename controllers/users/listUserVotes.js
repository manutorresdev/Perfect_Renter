// @ts-nocheck
const getDB = require('../../config/getDB');
/**
 * @module Users
 */
/**
 * Middleware para listar las valoraciones de un usuario
 * @param {*} req Necesaria la autenticación con un "token", en la que se encuentra el ID del usuario iniciado. Además del id del usuario a obtener información en los path params
 * @param {*} res Como respuesta, obtienes un objeto con los datos del usuario
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los votos
 */
const listUserVotes = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el id del usuario que hace la request
    const idReqUser = req.userAuth.idUser;

    // Obtenemos los votos del usuario a visualizar
    let [votes] = await connection.query(
      `
      SELECT voteValueRenter, commentRenter
      FROM votes
      WHERE idRenter = ?
      `,
      [idUser]
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

module.exports = listUserVotes;
