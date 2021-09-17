// @ts-nocheck
const getDB = require('../../config/getDB');
const { formatDate, validate } = require('../../libs/helpers');

const flatSchema = require('../../models/flatSchema');
/**
 * @module Flats
 */
/**
 * Middleware para generar un nuevo piso en la base de datos.
 * @param {*} req Como "requests", se requieren todos los datos relevantes del piso, como minimo ciudad, provinvia, dirección y edificio, mts,bedrooms, precio, estado
 * @param {*} res El servidor lanza como respuesta la confirmación de la creación de un nuevo piso.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const newFlat = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Validamos los datos recibidos.
    await validate(flatSchema, req.body);

    // Obtenemos los campos necesarios.
    const {
      city,
      province,
      address,
      edifice,
      stairs,
      flat,
      gate,
      duplex,
      mts,
      bedrooms,
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
      !edifice ||
      !mts ||
      !bedrooms ||
      !price ||
      !estate
    ) {
      const error = new Error('Debes rellenar todos los campos requeridos.');
      error.httpStatus = 400;
      throw error;
    }
    // Comprobamos si el email existe en la base de datos.
    const [rent] = await connection.query(
      `SELECT idFlat FROM flats WHERE city = ? AND province = ? AND address = ? AND edifice = ? AND stairs = ? AND flat = ? AND gate = ?`,
      [city, province, address, edifice, stairs, flat, gate]
    );

    // Si el email existe lanzamos un error.
    if (rent.length > 0) {
      const error = new Error('Ya existe un piso');
      error.httpStatus = 409;
      throw error;
    }

    // Guardamos al usuario en la base de datos junto al código de registro.
    await connection.query(
      `INSERT INTO flats (idUser, 
        city,
        province,
        address,
        edifice,
        stairs,
        flat,
        gate,
        duplex,
        mts,
        bedrooms,
        terrace,
        toilets,
        energyCertificate,
        availabilityDate,
        price,
        estate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.userAuth.idUser,
        city,
        province,
        address,
        edifice,
        stairs,
        flat,
        gate,
        duplex,
        mts,
        bedrooms,
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

module.exports = newFlat;
