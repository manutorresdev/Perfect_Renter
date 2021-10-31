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
const getProperty = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el id de la propiedad.
    const { idProperty } = req.params;

    // Obtenemos el id del usuario que hace la request.
    const { idUser } = req.userAuth;

    //Obtenemos los datos de las reservas de dicha propiedad.
    const [bookings] = await connection.query(
      `
      SELECT
      state, startBookingDate, endBookingDate
      FROM bookings WHERE idProperty = ?
      `,
      [idProperty]
    );

    console.log('\x1b[43m########\x1b[30m', bookings);

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

module.exports = getProperty;
