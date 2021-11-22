// @ts-nocheck
const getDB = require('../../config/getDB')
const { sendMail } = require('../../libs/helpers')
/**
 * @module Entries
 */
/**
 * Middleware que pide unos datos al usuario para enviarle la solicitud de contacto a un alquiler.
 * @param {*} req Como "requests", se requiere el id de la vivienda y los datos de contacto del usuario que contacta.
 * @param {*} res El servidor lanza como respuesta un correo al usuario a contactar.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const contactProperty = async (req, res, next) => {
  let connection
  try {
    connection = await getDB()

    // Obtenemos el id de la vivienda a contactar.
    const { idProperty } = req.params

    // Obtenemos los datos del usuario que contacta.
    const { name, lastName, email, tel, comentarios } = req.body

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
    )

    if (!comentarios || comentarios.length < 1) {
      const error = new Error(
        'Debes añadir un comentario. EJM: Estoy interesado en su vivienda, me vendría bien contactar con usted.'
      )
      error.httpStatus = 400
      throw error
    }

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
            Por favor responde lo antes posible el mensaje para mantener nuestro buen servicio.
          </td>
      </tbody>
    </table>
    `

    // Enviamos el correo del usuario que contacta, al usuario a contactar.
    if (process.env.NODE_ENV !== 'test') {
      await sendMail({
        to: property[0].email,
        subject: 'Mensaje de usuario Perfect Renter',
        body: emailBody
      })
      await sendMail({
        to: email,
        subject: 'Copia de tu mensaje - Perfect Renter',
        body: emailBody
      })
    }

    res.send({
      status: 'ok',
      message: 'Correo electrónico enviado con éxito.'
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = contactProperty
