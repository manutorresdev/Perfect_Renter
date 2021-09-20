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
      price,
      estate,
    } = req.body;

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
      const [property] = await connection.query(
        `SELECT idProperty FROM properties WHERE city = ? AND province = ? AND address = ? AND number = ? AND type = ? AND zipCode = ? AND stair = ? AND flat = ? AND gate is null`,
        [city, province, address, number, type, zipCode, stair, flat]
      );
      // Si el inmueble ya existe lanzamos un error.
      if (property.length > 0) {
        const error = new Error('Ya existe un piso con los datos ingresados');
        error.httpStatus = 409;
        throw error;
      }
    } else {
      const [property] = await connection.query(
        `SELECT idProperty FROM properties WHERE city = ? AND province = ? AND address = ? AND number = ? AND type = ? AND zipCode = ? AND stair = ? AND flat = ? AND gate = ?`,
        [city, province, address, number, type, zipCode, stair, flat, gate]
      );
      // Si el inmueble ya existe lanzamos un error.
      if (property.length > 0) {
        const error = new Error('Ya existe un piso con los datos ingresados');
        error.httpStatus = 409;
        throw error;
      }
    }
    const userId = req.userAuth.idUser;

    // Generamos la fecha de creación
    const createdAt = formatDate(new Date());

    // Guardamos la propiedad en la base de datos.
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
        estate,
        createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        createdAt,
      ]
    );

    // Comprobamos si hay fotos y las subimos
    if (req.files && req.files.photo) {
      const [property] = await connection.query(
        `
      SELECT idProperty FROM properties WHERE idUser = ? AND createdAt = ?
      `,
        [userId, createdAt]
      );

      // Recorremos las fotos recibidas para subirlas, solo cogemos 30.
      for (const photo of Object.values(req.files).slice(0, 29)) {
        let photoName;
        try {
          photoName = await savePhoto(photo);
        } catch (_) {
          const error = new Error('Formato incorrecto');
          error.httpStatus = 400;
          throw error;
        }
        await connection.query(
          `
          INSERT INTO photos (name,idProperty,createdAt)
          VALUES (?,?,?)
          `,
          [photoName, property[0].idProperty, createdAt]
        );
      }
    }
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
