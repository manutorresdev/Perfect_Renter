// @ts-nocheck
const { format } = require('date-fns');
const getDB = require('../../config/getDB');
const {
  sendMail,
  generateRandomString,
  formatDate,
} = require('../../libs/helpers');
/**
 * @module Entries
 */
/**
 * Middleware que pide unos datos al usuario para enviarle la solicitud de contacto a un alquiler.
 * @param {*} req Como "requests", se requiere el id de la vivienda y los datos de contacto del usuario que contacta.
 * @param {*} res El servidor lanza como respuesta un correo al usuario a contactar.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const bookProperty = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id de la vivienda a contactar.
    const { idProperty } = req.params;

    // Obtenemos el id del usuario que contacta.
    const { idUser: idReqUser } = req.userAuth;

    // Obtenemos los datos del usuario que contacta.
    let { name, lastName, email, tel, comentarios, startDate, endDate } =
      req.body;

    const now = formatDate(new Date());

    console.log('fecha inicial: ', startDate);
    console.log('fecha final: ', endDate);

    console.log('fecha actual: ', now);

    // Comprobamos que los campos obligatorios tengan contenido.

    if (!comentarios) {
      const error = new Error(
        'Debes añadir un comentario. EJM: Estoy interesado en su vivienda, me vendría bien contactar con usted.'
      );
      error.httpStatus = 400;
      throw error;
    }
    if (!startDate || !endDate) {
      const error = new Error('Falta definir la fecha de la reserva.');
      error.httpStatus = 400;
      throw error;
    }
    // Si la fecha reservada es menor a la fecha actual, lanzamos error.
    if (startDate < now) {
      const error = new Error('No puedes reservar en el pasado.');
      error.httpStatus = 403;
      throw error;
    }

    // Si la fecha end es menor a la fecha start, lanzamos error.
    if (endDate < startDate) {
      const error = new Error(
        'Fecha de salida debe ser mayor a la fecha de inicio'
      );
      error.httpStatus = 403;
      throw error;
    }

    // Seleccionamos la imagen, el nombre y la ciudad del alquiler contactar. (PARA EL FRONTEND)
    const [property] = await connection.query(
      `
        SELECT photos.name,properties.city, users.name AS ownerName, properties.idUser, users.email
        FROM properties
        LEFT JOIN photos ON properties.idProperty = photos.idProperty
        LEFT JOIN users ON users.idUser = properties.idUser
        WHERE properties.idProperty = ?
        `,
      [idProperty]
    );

    //  Comprobamos que no haya una solicitud en proceso de aceptar.
    const [valiDate] = await connection.query(
      `
      SELECT * FROM bookings WHERE (startBookingDate BETWEEN ? AND ?)  OR (endBookingDate BETWEEN ? AND ?)
        `,
      [startDate, endDate, startDate, endDate]
    );
    if (valiDate.length > 0) {
      res.send({
        statu: 'ok',
        message:
          'Las fechas seleccionada no estan disponibles para esta propiedad',
      });
    }

    const [petition] = await connection.query(
      `
      SELECT state FROM bookings WHERE idRenter = ? AND idTenant = ? AND idProperty = ? AND startBookingDate = ? AND endBookingDate = ?
        `,
      [property[0].idUser, idReqUser, idProperty, startDate, endDate]
    );

    // Si hay petición en proceso, lanzamos error y mostramos en que proceso está.
    if (petition.length > 0) {
      res.send({
        status: 'ok',
        Estado_de_la_peticion: `${petition[0].state}`,
        message:
          'Ya tienes petición en proceso para este alquiler. Si hay algún error, ponte en contacto con nosotros.',
      });
    } else {
      console.log('Esta entrando en este else:::::::########');
      // Si el usuario es el dueño de la vivienda, lanzamos error.
      if (idReqUser === Number(property[0].idUser)) {
        const error = new Error(
          'No puedes contactar con una vivienda de tu propiedad.'
        );
        error.httpStatus = 403;
        throw error;
      }

      // Seleccionamos el nombre completo, el email, el teléfono del usuario que contacta. (PARA EL FRONTEND)
      const [contactUser] = await connection.query(
        `
      SELECT name,lastName,tel,email FROM users WHERE idUser = ?
      `,
        [idReqUser]
      );

      if (!name) {
        name = contactUser[0].name;
        if (!name) {
          const error = new Error('Falta el nombre.');
          error.httpStatus = 400;
          throw error;
        }
      }
      if (!lastName) {
        lastName = contactUser[0].lastName;
        if (!lastName) {
          const error = new Error('Falta el apellido.');
          error.httpStatus = 400;
          throw error;
        }
      }
      if (!email) {
        email = contactUser[0].email;
        if (!email) {
          const error = new Error('Falta el email.');
          error.httpStatus = 400;
          throw error;
        }
      }
      if (!tel) {
        tel = contactUser[0].tel;
        if (!tel) {
          tel = 'No especificado.';
        }
      }

      // Generamos el codigo de reserva,
      const bookingCode = generateRandomString(10);
      // Definimos el body del email
      const emailBody = `
    <table>
      <tbody>
        <td>
          Hola ${property[0].ownerName},
          un inquilino está interesado en tu vivienda de ${property[0].city}.
          <br/>
          Datos del inquilino:
          <ul>
            <li><b>Nombre completo:</b> ${name} ${lastName}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Teléfono:</b> ${tel}</li>
            <li><b>Fecha de reserva:</b> Entrada: ${startDate} | Salida: ${endDate}</li>
          </ul>
          <br/>
          <b>Información adicional:</b>
          ${comentarios}
      </tbody>
      <tbody>
          <td>
            <br/>
            Tienes a tu disposición el teléfono y el correo electrónico del interesado si deseas responder.
            <br/>
            Si quieres aceptar su solicitud de reserva, pulsa en el botón de aceptar reserva.
            <br/>
            Si por el contrario no está interesado, pulse el botón de cancelar.
          </td>
      </tbody>
      <tfoot>
        <th>
            <button>
              <a href="http://localhost:3000/alquileres/${bookingCode}/accept"
            >ACEPTAR RESERVA</a></button>
            <span><span/>
            <span><span/>
            <button>
              <a href="http://localhost:3000/alquileres/${bookingCode}/cancel"
            >CANCELAR RESERVA</a></button>
        </th>
      </tfoot>
    </table>
    `;

      const emailBodyReq = `
    <table>
      <tbody>
        <td>
          Hola ${contactUser[0].name},
          Se ha solicitado con éxito la reserva de la vivienda en ${property[0].city}
          <br/>
          Datos de la reserva:
          <ul>
          <li><b>Código de reserva:</b> ${bookingCode}</li>
            <li><b>Nombre completo:</b> ${name} ${lastName}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Teléfono:</b> ${tel}</li>
            <li><b>Fecha de reserva:</b> Entrada: ${startDate} | Salida: ${endDate}</li>
          </ul>
          <br/>
          <b>Información adicional:</b>
          ${comentarios}
      </tbody>
      <tbody>
          <td>
            <br/>
            Si quieres cancelar la solicitud de reserva, pulsa en el botón de cancelar reserva.
            <br/>
          </td>
      </tbody>
      <tfoot>
        <th>
        <button>
            <a href="http://localhost:3000/alquileres/${bookingCode}/cancel">CANCELAR RESERVA</a>
        </button>
        </th>
      </tfoot>
    </table>
    `;
      // Enviamos el correo del usuario que contacta, al usuario a contactar.
      // if (process.env.NODE_ENV !== 'test') {
      //   await sendMail({
      //     to: property[0].email,
      //     subject: 'Solicitud de reserva.',
      //     body: emailBody,
      //   });

      //   // VALIDAR CORREO USUARIO QUE RESERVA
      //   await sendMail({
      //     to: email,
      //     subject: 'Solicitud de reserva.',
      //     body: emailBodyReq,
      //   });
      // }

      // Agregamos el código de reserva en la base de datos junto a la posible reserva.
      // CORREGIDO
      // await connection.query(
      //   `
      // INSERT INTO bookings(bookingCode,idRenter,idTenant,createdAt,idProperty,startBookingDate,endBookingDate) VALUES (?,?,?,?,?,?,?);
      // `,
      //   [
      //     bookingCode,
      //     property[0].idUser,
      //     idReqUser,
      //     formatDate(new Date()),
      //     idProperty,
      //     startDate,
      //     endDate,
      //   ]
      // );

      res.send({
        status: 'ok',
        message: 'Correo electrónico enviado con éxito.',
        bookingCode,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = bookProperty;
