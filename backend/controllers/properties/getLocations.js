const getDB = require('../../config/getDB');
/**
 * @module Entries
 */
/**
 * Middleware para listar las ciudades o provincias para el frontend
 * @param {*} res Como respuesta, obtienes un objeto con los datos esperados
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */

const getLocations = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Seleccionamos las provincias que contengan los carácteres introducidos
    const [provinces] = await connection.query(
      `
    SELECT provincia, provinciaid
    FROM provincias
    `
    );

    const [cities] = await connection.query(
      `
    SELECT poblacion,provincia,cp
    FROM municipios
    WHERE calle IS NULL
    `
    );

    res.send({
      status: 'ok',
      provinces,
      cities,
    });
    // if (req.route.path.includes('provincias')) {
    //   // Obtenemos la provincia que está introduciendo el usuario
    //   const { provincia } = req.body;

    //   // Seleccionamos las provincias que contengan los carácteres introducidos
    //   const [provinces] = await connection.query(
    //     `
    //     SELECT provincia
    //     FROM provincias
    //     WHERE provincia LIKE ?
    //     `,
    //     [provincia]
    //   );

    //   // Si hay provincias, las enviamos
    //   if (provinces) {
    //     console.log('\x1b[45m%%%%%%%', provinces);
    //     res.send({
    //       status: 'ok',
    //       provinces,
    //     });
    //   }
    //   if (req.route.path.includes('ciudades')) {
    //     const { ciudad } = req.body;

    //     //Obtenemos la ciudad que desea escribir el usuario
    //     const [cities] = await connection.query(
    //       `
    //     SELECT poblacion
    //     FROM municipios
    //     WHERE poblacion LIKE ? ;
    //     `,
    //       [ciudad]
    //     );

    //     res.send({
    //       status: 'ok',
    //       cities,
    //     });
    //   }
    // }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getLocations;
