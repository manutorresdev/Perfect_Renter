const getDB = require('../../config/getDB')
/**
 * @module Entries
 */
/**
 * Middleware para listar una propiedad en concreto
 * @param {*} req Se encuentra el id de la propiedad a obtener información en los path params
 * @param {*} res Como respuesta, obtienes un objeto con los datos de la propiedad si existe o mensaje si no se encuentra
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const getProperty = async (req, res, next) => {
  let connection
  try {
    connection = await getDB()

    // Obtenemos el id de la propiedad.
    const { idProperty } = req.params

    // Obtenemos los datos de la propiedad
    const [[property]] = await connection.query(
      `     SELECT
            idProperty,
            idUser,
            city,
            province,
            address,
            zipCode,
            number,
            type,
            stair,
            flat,
            gate,
            mts,
            rooms,
            garage,
            terrace,
            elevator,
            toilets,
            energyCertificate,
            availabilityDate,
            price,
            state FROM properties WHERE idProperty = ?`,
      [idProperty]
    )

    res.send({
      status: 'ok',
      property
    })
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = getProperty
