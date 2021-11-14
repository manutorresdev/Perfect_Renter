const getDB = require('../config/getDB');
const { uploadsDir } = require('../libs/helpers');

const path = require('path');

/**
 * @module Global
 */
/**
 * Middleware para listar las reservas de una propiedad en concreto
 * @param {*} req Se encuentra el id de la propiedad a obtener información en los path params
 * @param {*} req Se recibe como request el ID del usuario que hace la petición, que debe ser el dueño de la propiedad
 * @param {*} res Como respuesta, obtienes un objeto con los datos de la propiedad si existe o mensaje si no se encuentra
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const getPhoto = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el id de la propiedad.

    const { pictureName } = req.params;

    // Obtenemos el id del usuario que hace la request.
    /* const { idUser } = req.userAuth; */

    // Verificamos que la foto exista.
    const [picture] = await connection.query(
      `
      SELECT
      avatar
      FROM users WHERE avatar = ?
      `,
      [pictureName]
    );

    /*  const [picture] = await connection.query(
      `
      SELECT
      name
      FROM photos WHERE idProperty = 23
      `
       [idProperty] 
    ); */

    // Si no existe lanzamos error

    if (picture.length < 1) {
      const error = new Error('La foto no existe.');
      error.httpStatus = 404;
      throw error;
    }

    const photo = path.join(uploadsDir, pictureName);

    res.send({
      status: 'ok',
      photo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPhoto;
