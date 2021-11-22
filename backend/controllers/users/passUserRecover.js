// @ts-nocheck
const getDB = require('../../config/getDB')
const { validate, formatDate } = require('../../libs/helpers')
const { passSchema } = require('../../models/passSchema')
/**
 * @module Users
 */
/**
 * Middleware que a traves de un enlace, edita la contraseña del usuario que la ha solicitado
 * @param {*} req Como "requests", se requiere una contraseña válida, de no ser así, se lanza un error
 * @param {*} res El servidor lanza como respuesta una confirmación con el cambio
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const passUserRecover = async (req, res, next) => {
  let connection
  try {
    connection = await getDB()

    // Obtenemos el id del usuario y el código de recuperación.
    const { idUser, recoverCode } = req.params

    // Obtenemos la nueva contraseña del usuario.
    const { password } = req.body

    // Validamos la contraseña obtenida
    await validate(passSchema, req.body)

    // Comprobamos que el código de recuperación proporcionado sea el mismo que el de la base de datos.
    const [user] = await connection.query(
      `
    SELECT recoverCode FROM users WHERE idUser = ?
    `,
      [idUser]
    )

    // Si el código es diferente, enviamos un error.
    if (user[0].recoverCode !== recoverCode) {
      const error = new Error('El enlace no existe.')
      error.httpStatus = 404
      throw error
    }
    // Cambiamos el código de recuperación y la contraseña al usuario en la base de datos.
    await connection.query(
      `
    UPDATE users SET recoverCode = NULL, password = SHA2(?, 512), modifiedAt = ? WHERE idUser = ?
    `,
      [password, formatDate(new Date()), idUser]
    )

    res.send({
      status: 'ok',
      message: 'Contraseña cambiada con éxito.'
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = passUserRecover
