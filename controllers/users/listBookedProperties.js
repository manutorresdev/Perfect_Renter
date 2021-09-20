// @ts-nocheck
const getDB = require('../../config/getDB');
/**
 * @module Users
 */
/**
 * Middleware para listar las reservas de un usuario
 * @param {*} req Necesaria la autenticación con un "token", en la que se encuentra el ID del usuario iniciado. Además del id del usuario a obtener información en los path params
 * @param {*} res Como respuesta, obtienes un objeto con los datos del usuario
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const listBookedProperties = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el id del usuario que hace la request
    const idReqUser = req.userAuth.id;

    // Comprobamos que el usuario logueado es el dueño del usuario a listar reservas
    if (idUser !== idReqUser) {
      const error = new Error('No tienes permisos.');
      error.httpStatus = 403;
      throw error;
    }

    // Obtenemos los alquileres en reserva o alquilados actualmente del usuario
    const [bookedProperties] = await connection.query(
      `
            SELECT city, province, type, mts, price FROM properties
            LEFT JOIN votes ON properties.idProperty = votes.idProperty
            WHERE votes.idUser = ? AND (votes.estate = "reservado" OR votes.estate = "alquilado")
        `,
      [idUser]
    );

    console.log(bookedProperties);

    res.send({
      status: 'ok',
      bookedProperties,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listBookedProperties;
