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
    const idReqUser = req.userAuth.idUser;

    // Comprobamos que el usuario logueado es el dueño del usuario a listar reservas
    if (Number(idUser) !== idReqUser) {
      const error = new Error('No tienes permisos.');
      error.httpStatus = 403;
      throw error;
    }

    // Obtenemos los alquileres del usuario como INQUILINO = TENANT
    const [bookings] = await connection.query(
      `
      SELECT
      bookings.idProperty,
      idBooking,
      bookingCode,
      city,
      address,
      number,
      type,
      price,
      rooms,
      AVG(IFNULL(property_votes.voteValue, 0)) AS votes,
      bookings.state,
      startBookingDate,
      endBookingDate,
      (SELECT * FROM
        (SELECT name FROM photos WHERE photos.idProperty = properties.idProperty LIMIT 1) as prePhoto)
          as photo
      FROM properties
      LEFT JOIN photos ON properties.idProperty = photos.idProperty
      LEFT JOIN votes AS property_votes ON (properties.idProperty = property_votes.idProperty)
      LEFT JOIN bookings ON properties.idProperty = bookings.idProperty
      WHERE bookings.idTenant = ? AND (bookings.state = "reservado" OR bookings.state = "alquilada" OR bookings.state = "finalizada")
      GROUP BY bookings.idBooking;
      `,
      [idReqUser]
    );

    res.send({
      status: 'ok',
      bookings,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listBookedProperties;
