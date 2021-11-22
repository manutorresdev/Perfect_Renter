// @ts-nocheck
const { sendMail } = require('../libs/helpers')
/**
 * @module Global
 */
/**
 * Middleware que pide unos datos al usuario para enviarle la solicitud de contacto a otro usuario.
 * @param {*} req Como "requests", se requiere el mensaje, el asunto y elnombre de la persona que contacta con la empresa.
 * @param {*} res El servidor lanza como respuesta un correo al usuario a contactar.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const contactUs = async (req, res, next) => {
  try {
    // Obtenemos los datos del usuario que contacta.
    const { name, email, asunto, comentarios } = req.body

    // Si no están los datos obligatorios, lanzamos error.
    if (!name || !email || !comentarios) {
      const error = new Error('Faltan campos obligatorios.')
      error.httpStatus = 400
      throw error
    }

    // Definimos el body del email
    const emailBody = `
    <table>
      <tbody>
        <td>
          Datos del usuario:
          <ul>
            <li><b>Nombre completo:</b> ${name}</li>
            <li><b>Email:</b> ${email}</li>
          </ul>
          <br/>
          ${comentarios}
          <br/>
        </td>
      </tbody>
    </table>
    `

    // Enviamos el correo del usuario que contacta, al usuario a contactar.
    if (process.env.NODE_ENV !== 'test') {
      await sendMail({
        to: 'perfectrenterproject@gmail.com',
        subject: asunto,
        body: emailBody
      })
    }

    res.send({
      status: 'ok',
      message: 'Correo electrónico enviado con éxito.'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = contactUs
