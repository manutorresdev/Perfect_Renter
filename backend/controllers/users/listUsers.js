const getDB = require('../../config/getDB');
/**
 * @module Users
 */
/**
 * Middleware para listar usuarios
 * @param {*} req Puede tener parámetros de entrada como los orden o dirección
 * @param {*} res Como respuesta, se listan los datos básicos de todos los usuarios normales
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve una lista objetos con los datos
 */
const listUsers = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos los queryParams en caso de que haya.
    let { ciudad: filtCity, orden: order, direccion: direction } = req.query;

    // Cambiamos valores para encajar con backend.
    if (order === 'creacion') {
      order = 'users.createdAt';
    } else if (order === 'valoraciones') {
      order = 'votes';
    } else if (order === 'edad') {
      order = 'users.birthDate';
    }
    // Establecemos opciones de validación de orden.
    const validOrderOptions = ['users.createdAt', 'votes', 'users.birthDate'];

    // Establecemos opciones de valicadión de dirección
    const validDirectionOptions = ['DESC', 'ASC'];

    // Establecemos un orden por defecto
    const orderBy = validOrderOptions.includes(order) ? order : 'votes';

    // Establecemos una dirección por defecto
    let orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'DESC';
    const city = filtCity ?? '%';

    let users;
    console.log('ORDEN', orderBy);
    console.log('DIRECCION', orderDirection);
    // Obtenemos los datos de todos los usuarios
    // if (!city && order === 'birthDate') {
    // Filtrado por fecha de nacimiento.
    // console.log('Ordenado por fecha de nacimiento.');

    if (order === 'users.birthDate') {
      orderDirection = orderDirection === 'ASC' ? 'DESC' : 'ASC';
      console.log('CAMBIO DIRECCION', orderDirection);
      [users] = await connection.query(
        `SELECT users.bio,users.idUser,users.name, users.lastName, users.city, users.avatar, AVG(IFNULL(user_vote.voteValueRenter, 0)) AS votes, users.birthDate
          FROM users
          LEFT JOIN votes AS user_vote ON (users.idUser = user_vote.idTenant)
          WHERE users.name != "[deleted]" AND city LIKE ?
          group by users.idUser
          ORDER BY ${orderBy} ${orderDirection}
          `,
        [city, orderBy, orderDirection]
      );
    } else {
      [users] = await connection.query(
        `SELECT users.bio,users.idUser,users.name, users.lastName, users.city, users.avatar, AVG(IFNULL(user_vote.voteValueRenter, 0)) AS votes, users.birthDate
        FROM users
        LEFT JOIN votes AS user_vote ON (users.idUser = user_vote.idTenant)
        WHERE users.name != "[deleted]" AND city LIKE ?
        group by users.idUser
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [city, orderBy, orderDirection]
      );
    }
    // } else if (city) {
    //   // Filtrado por ciudad
    //   console.log('Filtrado por ciudad.');
    //   [users] = await connection.query(
    //     `SELECT users.bio,users.idUser,users.name, users.lastName, users.city, users.avatar, AVG(IFNULL(user_vote.voteValueRenter, 0)) AS votes, users.birthDate
    //   FROM users
    //   LEFT JOIN votes AS user_vote ON (users.idUser = user_vote.idTenant)
    //   WHERE city LIKE ? AND users.name != "[deleted]"
    //   group by users.idUser
    //   ORDER BY ${orderBy} ${orderDirection}
    //   `,
    //     [`%${city}%`]
    //   );
    // } else {
    //   console.log('Ordenado por votos');
    //   [users] = await connection.query(
    //     `SELECT users.bio,users.idUser,users.name, users.lastName,users.city, users.avatar, AVG(IFNULL(user_vote.voteValueRenter, 0)) AS votes, users.birthDate
    //   FROM users
    //   LEFT JOIN votes AS user_vote ON (users.idUser = user_vote.idTenant)
    //   WHERE users.name != "[deleted]"
    //   group by users.idUser
    //   order by votes ${orderDirection}
    //   `
    //   );
    // }

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
