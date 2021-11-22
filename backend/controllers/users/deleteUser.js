// @ts-nocheck
const getDB = require('../../config/getDB')
const {
  deletePhoto,
  generateRandomString,
  formatDate
} = require('../../libs/helpers')
/**
 * @module Users
 */
/**
 * Middleware para eliminar un usuario de la base de datos
 * @param {*} req Como "requests", se requiere el id del usuario que solicita la petición y el id del usuario que se quiere eliminar
 * @param {*} res El servidor lanza como respuesta que el usuario ha sido eliminado
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const deleteUser = async (req, res, next) => {
  let connection

  try {
    connection = await getDB()

    // Obtenemos id del usuario que queremos borrar
    const { idUser } = req.params

    // Importante lo primero es que no se pueda eliminar el administrador
    if (Number(idUser) === 1) {
      const error = new Error(
        'El administrador principal no se puede eliminar.'
      )
      error.httpStatus = 403
      throw error
    }

    /*
     * Si el usuario que realiza la petición no es el dueño de la cuenta o no es
     * administrador lanzamos error
     */
    if (
      req.userAuth.idUser !== Number(idUser) &&
      req.userAuth.role !== 'admin'
    ) {
      const error = new Error('No tienes permisos.')
      error.httpStatus = 403
      throw error
    }

    // Obtenemos el nombre del avatar
    const [user] = await connection.query(
      'SELECT avatar,email FROM users WHERE idUser = ?',
      [idUser]
    )

    // Si el usuario tiene avatar lo borramos del servidor
    if (user[0].avatar) {
      await deletePhoto(user[0].avatar)
    }

    // Si el usuario tiene inmuebles en su perfil, los eliminamos.
    const [properties] = await connection.query(
      `
    SELECT idProperty FROM properties WHERE idUser = ?
    `,
      [idUser]
    )

    if (properties.length > 0) {
      // Obtenemos el nombre de las fotos
      const [photos] = await connection.query(
        'SELECT name FROM photos WHERE idProperty = ?',
        [properties[0].idProperty]
      )
      // Eliminamos las fotos del servidor y la base de datos.
      for (const photo of photos) {
        deletePhoto(photo.name)
      }

      // Eliminamos la propiedad de la base de datos.
      for (const property of properties) {
        await connection.query(
          `
        DELETE FROM properties WHERE idProperty = ?
        `,
          [property.idProperty]
        )
      }
    }
    // Anonimizamos al usuario
    await connection.query(
      'UPDATE users SET email = ?, password = ?, name = "[deleted]" , lastName = "[deleted]",tel = "[deleted]", avatar = NULL, renterActive = false, deleted = true, bio = "[deleted]", city = "[deleted]", birthDate = ? , modifiedAt = ? WHERE idUser = ?',
      [
        `${user[0].email}_deleted`,
        generateRandomString(20),
        formatDate(0),
        formatDate(new Date()),
        idUser
      ]
    )
    res.send({
      status: 'ok',
      message: 'Usuario eliminado'
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = deleteUser
