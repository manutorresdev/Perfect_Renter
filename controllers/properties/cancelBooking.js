const getDB = require('../../config/getDB');
const { sendMail, formatDate } = require('../..//libs/helpers');

const cancelBooking = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Recuperamos los parametros de la reserva a cancelar
    const { idProperty, bookingCode } = req.params;

    // Obtenemos el id del usuario que hace la request.
    const idUser = req.userAuth.idUser;

    //Verificamos que exista la solicitud de reserva en la BD
    const [booking] = await connection.query(
      `
            SELECT * FROM bookings WHERE bookingCode = ?
       `,
      [bookingCode]
    );
    // Mensaje que enviaremos al usuario.

    let emailBodyRenter;
    let emailBodyTenant;

    if (booking.length === 0) {
      const error = new Error('No hay reservas pendientes con ese codigo');
      error.httpStatus = 400;
      throw error;
    }

    const [userRenter] = await connection.query(
      `
          SELECT name, email FROM users WHERE idUser = ?
    `,
      [booking[0].idRenter]
    );
    const [userTenant] = await connection.query(
      `
          SELECT name, email FROM users WHERE idUser = ?
    `,
      [booking[0].idTenant]
    );
    //Verificamos si la cancelacion la hace el tenant o el renter y lo registramos
    if (idUser === booking[0].idRenter) {
      await connection.query(
        `
            UPDATE bookings SET state = "cancelado-renter" WHERE bookingCode = ?
        `,
        [bookingCode]
      );

      emailBodyRenter = `
      <table>
        <thead>
            <th>Confirmación de Cancelación Reserva ${booking[0].bookingCode}</th>
        </thead>
        <tbody>
            <td>
              Hola ${userRenter[0].name}
              Se ha registrado correctamente la cancelación de la reserva de ${userTenant[0].name}.
            </td>
        </tbody>
        <tfoot>
        <td>
            Si tienes alguna pregunta no dudes en escribirnos.
        </td>
        </tfoot>
      </table>
    `;
      emailBodyTenant = `
      <table>
        <thead>
            <th>Confirmación de Cancelación Reserva ${booking[0].bookingCode}</th>
        </thead>
        <tbody>
            <td>
              Hola ${userTenant[0].name}
              Lamentamos informarte que el usuario ${userRenter[0].name} ha Anulado la reserva que tenias.
            </td>
        </tbody>
        <tfoot>
        <td>
            Si tienes alguna pregunta no dudes en escribirnos.
        </td>
        </tfoot>
      </table>
    `;
    } else if (idUser === booking[0].idTenant) {
      await connection.query(
        `
            UPDATE bookings SET state = "cancelado-tenant" WHERE bookingCode = ?
            `,
        [bookingCode]
      );
      emailBodyRenter = `
      <table>
        <thead>
            <th>Confirmación de Cancelación Reserva ${booking[0].bookingCode}</th>
        </thead>
        <tbody>
            <td>
              Hola ${userRenter[0].name}
              Lamentamos informarte que el usuario ${userTenant[0].name} ha Anulado la reserva que tenias.
            </td>
        </tbody>
        <tfoot>
        <td>
            Si tienes alguna pregunta no dudes en escribirnos.
        </td>
        </tfoot>
      </table>
    `;
      emailBodyTenant = `
      <table>
        <thead>
            <th>Confirmación de Cancelación Reserva ${booking[0].bookingCode}</th>
        </thead>
        <tbody>
            <td>
              Hola ${userTenant[0].name}
              Se ha registrado correctamente la cancelación de la reserva de la propiedad de ${userRenter[0].name}.
            </td>
        </tbody>
        <tfoot>
        <td>
            Si tienes alguna pregunta no dudes en escribirnos.
        </td>
        </tfoot>
      </table>
    `;
    } else {
      const error = new Error('No hay reservas asociadas a su usuario');
      error.httpStatus = 400;
      throw error;
    }

    await sendMail({
      to: userRenter[0].email,
      subject: 'Cancelación de resserva',
      body: emailBodyRenter,
    });
    await sendMail({
      to: userTenant[0].email,
      subject: 'Cancelación de resserva',
      body: emailBodyTenant,
    });

    res.send({
      status: 'ok',
      message: 'La reserva ha sido cancelada Correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = cancelBooking;
