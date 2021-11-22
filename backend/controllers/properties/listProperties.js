const getDB = require('../../config/getDB')
/**
 * @module Entries
 */
/**
 * Middleware para listar propiedades
 * @param {*} req Puede tener request de query como los de orden o dirección y params como id de usuario a consultar
 * @param {*} res Como respuesta, se listan los datos básicos de todos las propiedades
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve una lista objetos con los datos
 */
const listProperties = async (req, res, next) => {
  let connection
  try {
    connection = await getDB()

    // Obtenemos los queryParams en caso de que haya.
    let {
      orden: order,
      direccion: direction,
      ciudad: filtCity,
      provincia: filtProvince,
      tipo: filtType,
      pMax: filtPmax,
      pMin: filtPmin,
      hab: filtRooms,
      garaje: filtGarage,
      baños: filtToilets,
      m2: filtMts,
      entrada: startDate,
      salida: endDate
    } = req.query
    console.log()
    // Cambiamos valores para encajar con backend.
    if (order === 'precio') {
      order = 'price'
    } else if (order === 'creacion') {
      order = 'createdAt'
    } else if (order === 'valoraciones') {
      order = 'votes'
    }

    // Establecemos opciones de validación de orden.
    const validOrderOptions = ['votes', 'createdAt', 'price']

    // Establecemos opciones de valicadión de dirección
    const validDirectionOptions = ['DESC', 'ASC']

    // Establecemos un orden por defecto
    const orderBy = validOrderOptions.includes(order) ? order : 'createdAt'

    // Establecemos una dirección por defecto
    const orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'ASC'

    // Verificamos valores de los filtros y si no vienen les asignamos por defecto
    const city = filtCity || '%'
    const province = filtProvince || '%'
    const type = filtType || '%'
    const pmax = filtPmax || 10000
    const pmin = filtPmin || 0
    const rooms = filtRooms || 0
    const garage = filtGarage || 0
    const toilets = filtToilets || 0
    const mts = filtMts || 0

    let properties
    /** *** Verificamos si la peticion viene de un usuario Propietario *****/
    if (req.params.idUser) {
      // Obtenemos el id del usuario que hace la peticion.
      const { idUser } = req.params;

      [[properties]] = await connection.query(
        `
      SELECT properties.idProperty,
      properties.idUser,
      description,
      city,
      province,
      address,
      zipCode,
      number,
      type,
      stair,
      elevator,
      flat,
      gate,
      mts,
      rooms,
      garage,
      terrace,
      toilets,
      energyCertificate,
      availabilityDate,
      price,
      state,
      AVG(IFNULL(property_vote.voteValue, 0)) AS votes,
      properties.createdAt
      FROM properties
      LEFT JOIN votes AS property_vote ON (properties.idProperty = property_vote.idProperty)
      WHERE properties.idUser = ?
      group by properties.idProperty
      ORDER BY ${
        order === 'votes' ? 'votes' : `properties.${orderBy}`
      } ${orderDirection}
      `,
        [idUser]
      )
      /** ********* Final usuario propietario *****************/
    } else {
      // Si hay filtro por fechas, comprobamos que propiedades están disponibles para dichas fechas.
      if (startDate && endDate) {
        // Seleccionamos las propiedades que tienen esas fechas libres
        const [propertiesWithDatesFree] = await connection.query(
          `
          SELECT idProperty FROM properties
          WHERE NOT idProperty = ANY (
          SELECT idProperty FROM bookings
           WHERE (startBookingDate BETWEEN ? AND ?)
           AND state != "finalizada"
           OR (endBookingDate BETWEEN ? AND ?)
           AND state != "finalizada"
           GROUP BY idProperty)
           GROUP BY idProperty;
          `,
          [startDate, endDate, startDate, endDate]
        )
        // Obtenemos los datos de las propiedades
        const propertiesToFilter = []
        for (const property of propertiesWithDatesFree) {
          propertiesToFilter.push(property.idProperty)
        }

        [properties] = await connection.query(
          `
          SELECT properties.idProperty,
          properties.idUser,
          description,
          city,
          province,
          address,
          zipCode,
          number,
          type,
          stair,
          elevator,
          flat,
          gate,
          mts,
          rooms,
          garage,
          terrace,
          toilets,
          energyCertificate,
          availabilityDate,
          price,
          state,
          AVG(IFNULL(property_vote.voteValue, 0)) AS votes,
          properties.createdAt
          FROM properties
          LEFT JOIN votes AS property_vote ON (properties.idProperty = property_vote.idProperty)
          WHERE properties.idProperty IN (?) AND city LIKE ? AND province LIKE ? AND (type LIKE ? OR type LIKE ? OR type LIKE ?) AND rooms >= ? AND (price BETWEEN ?
            AND ?) AND garage >= ? AND toilets >= ? AND mts >= ?
            GROUP BY properties.idProperty
            ORDER BY  ${
              order === 'votes' ? 'votes' : `properties.${orderBy}`
            } ${orderDirection}
            `,
          [
            propertiesToFilter,
            city,
            province,
            type.split(',')[0],
            type.split(',')[1],
            type.split(',')[2],
            rooms,
            pmin,
            pmax,
            garage,
            toilets,
            mts
          ]
        )
      } else {
        // Obtenemos los datos de todas las propiedades

        [properties] = await connection.query(
          `
          SELECT properties.idProperty,
          properties.idUser,
          description,
          city,
          province,
          address,
          zipCode,
          number,
          type,
          stair,
          elevator,
          flat,
          gate,
          mts,
          rooms,
          garage,
          terrace,
          toilets,
          energyCertificate,
          availabilityDate,
          price,
          state,
          AVG(IFNULL(property_vote.voteValue, 0)) AS votes,
          properties.createdAt
          FROM properties
          LEFT JOIN votes AS property_vote ON (properties.idProperty = property_vote.idProperty)
          WHERE city LIKE ? AND province LIKE ? AND (type LIKE ? OR type LIKE ? OR type LIKE ?) AND rooms >= ? AND (price BETWEEN ?
            AND ?) AND garage >= ? AND toilets >= ? AND mts >= ?
            GROUP BY properties.idProperty
            ORDER BY  ${
              order === 'votes' ? 'votes' : `properties.${orderBy}`
            } ${orderDirection}
            `,
          [
            city,
            province,
            type.split(',')[0],
            type.split(',')[1],
            type.split(',')[2],
            rooms,
            pmin,
            pmax,
            garage,
            toilets,
            mts
          ]
        )
      }

      // Si hay coincidencias para la query las devolvemos, sino mostramos mensaje de no encontrado

      res.send({
        status: 'ok',
        properties
      })
    }
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}

module.exports = listProperties
