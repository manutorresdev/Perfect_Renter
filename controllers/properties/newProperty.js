// @ts-nocheck
const getDB = require('../../config/getDB');
const { formatDate, validate } = require('../../libs/helpers');

const { propertySchema } = require('../../models/propertySchema');
/**
 * @module property
 */
/**
 * Middleware para generar un nuevo piso en la base de datos.
 * @param {*} req Como "requests", se requieren todos los datos relevantes del piso, como minimo ciudad, provinvia, dirección y edificio, mts,bedrooms, precio, estado
 * @param {*} res El servidor lanza como respuesta la confirmación de la creación de un nuevo piso.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const newProperty = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Validamos los datos recibidos.
    await validate(propertySchema, req.body);

    // Obtenemos los campos necesarios.
    const {
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
      bedrooms,
      garage,
      terrace,
      toilets,
      energyCertificate,
      availabilityDate,
      price,
      estate,
    } = req.body;
    console.log(req.userAuth);
    // Comprobamos que no faltan campos a rellenar.
    if (
      !city ||
      !province ||
      !address ||
      !number ||
      !type ||
      !zipCode ||
      !mts ||
      !bedrooms ||
      !price ||
      !estate
    ) {
      const error = new Error('Debes rellenar todos los campos requeridos.');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos si el piso ya existe en la base de datos.
    if (!gate) {
      const [rent] = await connection.query(
        `SELECT idProperty FROM properties WHERE city = ? AND province = ? AND address = ? AND number = ? AND type = ? AND zipCode = ? AND stair = ? AND flat = ? AND gate is null`,
        [city, province, address, number, type, zipCode, stair, flat]
      );
      // Si el email existe lanzamos un error.
      if (rent.length > 0) {
        const error = new Error('Ya existe un piso con los datos ingresados');
        error.httpStatus = 409;
        throw error;
      }
    } else {
      const [rent] = await connection.query(
        `SELECT idProperty FROM properties WHERE city = ? AND province = ? AND address = ? AND number = ? AND type = ? AND zipCode = ? AND stair = ? AND flat = ? AND gate = ?`,
        [city, province, address, number, type, zipCode, stair, flat, gate]
      );
      // Si el email existe lanzamos un error.
      if (rent.length > 0) {
        const error = new Error('Ya existe un piso con los datos ingresados');
        error.httpStatus = 409;
        throw error;
      }
    }
    const userId = req.userAuth.idUser;
    // Guardamos al usuario en la base de datos junto al código de registro.
    await connection.query(
      `INSERT INTO properties (
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
      bedrooms,
      garage,
      terrace,
      toilets,
      energyCertificate,
      availabilityDate,
      price,
      estate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
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
        bedrooms,
        garage,
        terrace,
        toilets,
        energyCertificate,
        formatDate(new Date()),
        price,
        estate,
      ]
    );

    res.send({
      status: 'ok',
      message: 'El piso se ha creado correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newProperty;
