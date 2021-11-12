const getDB = require('../../config/getDB');
/**
 * @module Entries
 */
/**
 * Middleware para listar las reservas de una propiedad en concreto
 * @param {*} req Se encuentra el id de la propiedad a obtener información en los path params
 * @param {*} req Se recibe como request el ID del usuario que hace la petición, que debe ser el dueño de la propiedad
 * @param {*} res Como respuesta, obtienes un objeto con los datos de la propiedad si existe o mensaje si no se encuentra
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const getBookings = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    /**
     * ########################
     * ### BOOKINGS PROPERTY ##
     * ########################
     */

    if (req.route.path.includes('properties')) {
      //Obtenemos el id de la propiedad.
      const { idProperty } = req.params;

      //Obtenemos los datos de las reservas de dicha propiedad.
      const [bookings] = await connection.query(
        `
      SELECT
      idBooking, idRenter, idTenant, state, startBookingDate, endBookingDate
      FROM bookings
      WHERE idProperty = ?
      ORDER BY startBookingDate
      `,
        [idProperty]
      );
      res.send({
        status: 'ok',
        bookings,
      });
    }

    /**
     * ####################
     * ### BOOKINGS USER ##
     * ####################
     */

    if (req.route.path.includes('renter')) {
      // Obtenemos el id del usuario que hace la request.
      const { idUser: idReqUser } = req.userAuth;

      //Obtenemos los datos de las reservas de dicho usuario COMO CASERO.
      const [bookings] = await connection.query(
        `
        SELECT
        bookings.idProperty,
        bookings.idTenant,
        idBooking,
        bookingCode,
        price,
        city,
        address,
        number,
        type,
        bookings.state,
        startBookingDate,
        endBookingDate,
        (SELECT * FROM
          (SELECT name FROM photos WHERE photos.idProperty = properties.idProperty LIMIT 1) as prePhoto)
            as photo
        FROM properties
        LEFT JOIN votes AS property_votes ON (properties.idProperty = property_votes.idProperty)
        LEFT JOIN bookings ON properties.idProperty = bookings.idProperty
        WHERE bookings.idRenter = ? AND bookings.state = "finalizada"
        GROUP BY bookings.idBooking;
        `,
        [idReqUser]
      );
      res.send({
        status: 'ok',
        bookings,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getBookings;
