// @ts-nocheck
const { format } = require('date-fns');
const getDB = require('../../config/getDB');
const { sendMail, formatDate } = require('../../libs/helpers');
/**
 * @module Entries */
/**
 * Middleware que valida una reserva
 * @param {*} req Como "requests", se requiere el código que viene en la URL
 * @param {*} res El servidor confirma la validación si no hay errores
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const acceptBooking = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    // Obtenemos el codigo de reserva de los path params.
    const { bookingCode } = req.params;

    // Obtenemos el id del usuario que acepta. Debe ser el del casero
    const { idUser: idRenter } = req.userAuth;

    //Verificamos que la propiedad y el casero existen
    const [property] = await connection.query(
      `SELECT b.idProperty, b.idRenter
      FROM bookings b
      WHERE bookingCode = ? AND idRenter = ?`,
      [bookingCode, idRenter]
    );

    // si la propiedad no existe enviamos error
    if (property.length < 1) {
      const error = new Error('La vivienda no existe o no tienes permisos.');
      error.httpStatus = 404;
      throw error;
    }

    // Comprobamos que la reserva a validar, está pendiente de aceptar.
    const [booking] = await connection.query(
      `
      SELECT b.startBookingDate, b.endBookingDate, idBooking, b.state, properties.city, u1.email as RenterEmail, u1.name as RenterName, u2.email as TenantEmail, u2.name AS TenantName
      FROM bookings b
      LEFT JOIN properties ON b.idProperty = properties.idProperty
      LEFT JOIN users as u1 ON b.idRenter = u1.idUser
      LEFT JOIN users as u2 ON b.idTenant = u2.idUser
      WHERE bookingCode = ?
    `,
      [bookingCode]
    );

    // Si no hay reserva para aceptar, lanzamos error.
    if (booking[0].state !== 'peticion') {
      const error = new Error('No hay reserva pendiente de aceptar.');
      error.httpStatus = 404;
      throw error;
    }
    // Una vez aceptada enviammos email a ambos usuarios
    const start = format(booking[0].startBookingDate, 'dd-MM-yyyy');
    const end = format(booking[0].endBookingDate, 'dd-MM-yyyy');
    //Email para el dueño que aceptó la reserva
    let emailBody = `
    <table>
    <tbody>
    <td>
    Hola ${booking[0].RenterName},
    la reserva de la vivienda de ${booking[0].city} ha sido aceptada.
    </td>
    <br/>
    <td>
      <b>Fecha de entrada: ${start}</b>
      <b>Fecha de salida: ${end}</b>
    </td>
    </tbody>
    </table>
    `;

    // Enviamos el correo al inquilino
    if (process.env.NODE_ENV !== 'test') {
      await sendMail({
        to: booking[0].RenterEmail,
        subject: 'Reserva de alquiler',
        body: emailBody,
      });
    }

    // Email para el inquilino
    emailBody = `
    <table>
    <tbody>
    <td>
    Hola ${booking[0].TenantName},
    !La reserva de la vivienda de ${booking[0].city} ha sido realizada!
    </td>
    <td>
    <b>¿Preparado para viajar?</b>
    </td>
    <br/>
    <td>
      <b>Fecha de entrada: ${start}</b>
      <b>Fecha de salida: ${end}</b>
    </td>
    </tbody>
    </table>
    `;

    // Enviamos el correo al dueño de la vivienda
    if (process.env.NODE_ENV !== 'test') {
      await sendMail({
        to: booking[0].TenantEmail,
        subject: 'Reserva de alquiler',
        body: emailBody,
      });
    }

    // Aceptada la reserva, cambiamos el estado de la reserva de "petición" a "reservado"
    await connection.query(
      `
    UPDATE bookings SET state = "reservado", modifiedAt = ? WHERE bookingCode = ?
    `,
      [formatDate(new Date()), bookingCode]
    );

    // Encargamos a SQL de hacer el cambio de "reservado" a "alquilado"
    await connection.query(
      `
    CREATE EVENT ${bookingCode}_event_start
    ON SCHEDULE AT "${format(booking[0].startBookingDate, 'yyyy-MM-dd')}"
    DO
    UPDATE bookings SET state = "alquilada", modifiedAt = ? WHERE bookingCode = ?
    `,
      [formatDate(new Date()), bookingCode]
    );

    // Encargamos a SQL de hacer el cambio de "alquilado" a "finalizado"

    await connection.query(
      `
    CREATE EVENT ${bookingCode}_event_end
    ON SCHEDULE AT "${format(booking[0].endBookingDate, 'yyyy-MM-dd')}"
    DO
    UPDATE bookings SET state = "finalizada", modifiedAt = ? WHERE bookingCode = ?
    `,
      [formatDate(new Date()), bookingCode]
    );

    res.send({
      status: 'ok',
      message: 'Reserva aceptada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = acceptBooking;
