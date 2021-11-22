// @ts-nocheck
const getDB = require('../../config/getDB')
const { savePhoto, formatDate } = require('../../libs/helpers')
/**
 * @module Entries
 */
/**
 * Middleware que guarda las fotos de los inmuebles.
 * @param {*} req Como "requests", se requiere el id del inmueble
 * @param {*} res El servidor guarda la foto y obtenemos el nombre de la misma. Si no llega la foto o se supera el número máximo de fotos, lanza un error
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const addPropertyPhoto = async (req, res, next) => {
  let connection

  try {
    connection = await getDB()

    // Obtenemos id del inmueble
    const { idProperty } = req.params

    // Si no recibimos foto lanzamos error
    if (!req.files.photo) {
      const error = new Error('No se ha encontrado el archivo.')
      error.httpStatus = 400
      throw error
    }

    for (const photo of Object.values(req.files)) {
      // Obtenemos la cantidad de fotos que tiene esa propiedad.
      const [photos] = await connection.query(
        `
      SELECT idPhoto FROM photos WHERE idProperty = ?
      `,
        [idProperty]
      )

      // Comprobamos que no haya más de 30 fotos.
      if (photos.length > 29) {
        const error = new Error('Solo puedes subir un máximo de 30 fotos.')
        error.httpStatus = 403
        throw error
      }
      let photoName
      try {
        photoName = await savePhoto(photo)
      } catch (_) {
        const error = new Error('Formato incorrecto.')
        error.httpStatus = 400
        throw error
      }
      await connection.query(
        `
      INSERT INTO photos (name,idProperty,createdAt)
      VALUES (?,?,?)
      `,
        [photoName, idProperty, formatDate(new Date())]
      )
    }
    res.send({
      status: 'ok',
      message: 'Las fotos han sido subidas.'
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = addPropertyPhoto
