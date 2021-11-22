const getDB = require('../../config/getDB')
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
const getPhotos = async (req, res, next) => {
  let connection
  try {
    connection = await getDB()

    // Obtenemos el id de la propiedad.
    const { idProperty } = req.params

    // Obtenemos los datos de las fotos de dicha propiedad.
    const [photos] = await connection.query(
      `
      SELECT
      name
      FROM photos
      WHERE idProperty = ?
      `,
      [idProperty]
    )

    res.send({
      status: 'ok',
      photos
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = getPhotos
