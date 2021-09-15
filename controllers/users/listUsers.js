const getDB = require('../../config/getDB');
/**
 * @module Users
 */
/**
 * Middleware para listar un usuario en concreto.
 * @param {*} req No necesita parametros de entrada.
 * @param {*} res Como respuesta, se listan los datos basicos de todos los usuarios normales
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 * @returns {Promise} Devuelve una lista objetos con los datos.
 */
const listUsers = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos los datos de todos los usuarios
    const [users] = await connection.query(
      `SELECT users.name, users.lastName, users.avatar, AVG(IFNULL(user_vote.vote, 0)) AS votes
      FROM users
      LEFT JOIN votes AS user_vote ON (users.idUser = user_vote.idVoted)
      group by users.idUser
      order by votes desc`
    );

    res.send({
      status: 'ok',
      users,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listUsers;
