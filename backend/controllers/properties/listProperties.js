const getDB = require('../../config/getDB');
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
  let connection;
  try {
    connection = await getDB();

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
    } = req.query;

    // Cambiamos valores para encajar con backend.
    if (order === 'precio') {
      order = 'price';
    } else if (order === 'creacion') {
      order = 'createdAt';
    } else if (order === 'valoraciones') {
      order = 'votes';
    }

    // Establecemos opciones de validación de orden.
    const validOrderOptions = ['votes', 'createdAt', 'price'];

    // Establecemos opciones de valicadión de dirección
    const validDirectionOptions = ['DESC', 'ASC'];

    // Establecemos un orden por defecto
    const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

    // Establecemos una dirección por defecto
    const orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'ASC';

    //Verificamos valores de los filtros y si no vienen les asignamos por defecto
    const city = filtCity ? filtCity : '%';
    const province = filtProvince ? filtProvince : '%';
    const type = filtType ? filtType : '%';
    const pmax = filtPmax ? filtPmax : 10000;
    const pmin = filtPmin ? filtPmin : 0;
    const rooms = filtRooms ? filtRooms : 1;
    const garage = filtGarage ? filtGarage : '%';
    const toilets = filtToilets ? filtToilets : 1;
    const mts = filtMts ? filtMts : 0;

    let properties;
    /***** Verificamos si la peticion viene de un usuario Propietario *****/
    if (req.params.idUser) {
      // Obtenemos el id del usuario que hace la peticion.
      const { idUser } = req.params;

      [[properties]] = await connection.query(
        `
      SELECT properties.idProperty,
      properties.idUser,
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
      );
    } else {
      /*********** Final usuario propietario *****************/
      // Obtenemos los datos de todas las propiedades

      [properties] = await connection.query(
        `
        SELECT properties.idProperty,
          properties.idUser,
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
          toilets,
          energyCertificate,
          availabilityDate,
          price,
          state,
          AVG(IFNULL(property_vote.voteValue, 0)) AS votes,
          properties.createdAt
          FROM properties
          LEFT JOIN votes AS property_vote ON (properties.idProperty = property_vote.idProperty)
          WHERE city LIKE ? AND province LIKE ? AND type LIKE ? AND (price BETWEEN ?
          AND ?) AND rooms >= ? AND garage = ? AND toilets >= ?  AND mts >= ?
          group by properties.idProperty
          ORDER BY  ${
            order === 'votes' ? 'votes' : `properties.${orderBy}`
          } ${orderDirection}
          `,
        [city, province, type, pmin, pmax, rooms, garage, toilets, mts]
      );
    }
    //Si hay coincidencias para la query las devolvemos, sino mostramos mensaje de no encontrado
    if (properties.length === 0) {
      res.send({
        status: 'ok',
        message: 'No hay conicidencias para su busqueda',
      });
    } else {
      res.send({
        status: 'ok',
        properties,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listProperties;
