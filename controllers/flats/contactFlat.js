// @ts-nocheck
const getDB = require('../../config/getDB');
const { sendMail } = require('../../libs/helpers');
/**
 * @module Entries
 */
/**
 * Middleware que pide unos datos al usuario para enviarle la solicitud de contacto a un alquiler.
 * @param {*} req Como "requests", se requiere el id de la vivienda y los datos de contacto del usuario que contacta.
 * @param {*} res El servidor lanza como respuesta un correo al usuario a contactar.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const contactFlat = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Obtenemos el id la vivienda a contactar.
    const { idFlat } = req.params;

    // Obtenemos los datos del usuario que contacta.
    let { name, lastName, email, tel, comentarios } = req.body;

    // Seleccionamos la imagen, el nombre y la ciudad del alquiler contactar. (PARA EL FRONTEND)
    const [flat] = await connection.query(
      `
      SELECT photos.name,flats.city, users.name AS ownerName, flats.idUser, users.email
      FROM flats
      LEFT JOIN photos ON flats.idFlat = photos.idFlat
      LEFT JOIN users ON users.idUser = flats.idUser
      WHERE flats.idFlat = ?
        `,
      [idFlat]
    );

    // Si el usuario es el dueño de la vivienda, lanzamos error.
    if (req.userAuth.idUser === Number(flat[0].idUser)) {
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
      [req.userAuth.idUser]
    );

    console.log(contactUser);

    // Comprobamos que los campos obligatorios tengan contenido.
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
    if (!comentarios) {
      const error = new Error(
        'Debes añadir un comentario. EJM: Estoy interesado en su vivienda, me vendría bien contactar con usted.'
      );
    }
    // Definimos el body del email
    const emailBody = `
    <table>
      <tbody>
        <td>
          Hola ${flat[0].ownerName},
          un inquilino está interesado en tu vivienda de ${flat[0].city}.
          <br/>
          Datos del inquilino:
          <ul>
            <li><b>Nombre completo:</b> ${name} ${lastName}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Teléfono:</b> ${tel}</li>
          </ul>
          <br/>
          ${comentarios}
          <br/>
            Tienes a tu disposición el teléfono y el correo electrónico del interesado si deseas responder.
        </td>
      </tbody>
    </table>
    `;

    // Enviamos el correo del usuario que contacta, al usuario a contactar.
    await sendMail({
      to: flat[0].email,
      subject: 'Solicitud de alquiler',
      body: emailBody,
    });
    res.send({
      status: 'ok',
      message: 'Correo electrónico enviado con éxito.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = contactFlat;
