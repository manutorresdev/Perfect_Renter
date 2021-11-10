// @ts-nocheck
const getDB = require('../../config/getDB');
const { formatDate, validate, savePhoto } = require('../../libs/helpers');

const { propertySchema } = require('../../models/propertySchema');
/**
 * @module Entries
 */
/**
 * Middleware para generar un nuevo piso en la base de datos.
 * @param {*} req Como "requests", se requieren todos los datos relevantes del piso, como minimo ciudad, provinvia, dirección y edificio, mts,rooms, precio, estado
 * @param {*} res El servidor lanza como respuesta la confirmación de la creación de un nuevo piso.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const newProperty = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //convertimos en número los datos booleanos
    if (req.body.garage === 'true') {
      req.body.garage = 1;
    } else {
      req.body.garage = 0;
    }
    if (req.body.terrace === 'true') {
      req.body.terrace = 1;
    } else {
      req.body.terrace = 0;
    }
    if (req.body.elevator === 'true') {
      req.body.elevator = 1;
    } else {
      req.body.elevator = 0;
    }
    if (req.body.energyCertificate === 'true') {
      req.body.energyCertificate = 1;
    } else {
      req.body.energyCertificate = 0;
    }
    // Validamos los datos recibidos.
    await validate(propertySchema, req.body);

    // Obtenemos los campos necesarios.
    let {
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
      price,
      description,
      state,
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
      !rooms ||
      !price ||
      !state
    ) {
      const error = new Error('Debes rellenar todos los campos requeridos.');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos que la ciudad pertenece a la provincia correcta
    const [verify] = await connection.query(
      `
    SELECT cp,provincia,poblacion FROM municipios WHERE poblacion = ? AND provincia = ?
    `,
      [city, province]
    );

    if (verify.length < 1) {
      const error = new Error(
        'Hay un error en la ciudad o la provincia, revisa los datos de nuevo.'
      );
      error.httpStatus = 403;
      throw error;
    }

    // Cambiamos el CP
    if (verify[0].cp.length < 5) {
      zipCode = `0${verify[0].cp}`;
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

    // Obtenemos el usuario que sube el inmueble
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
        rooms,
        garage,
        terrace,
        elevator,
        toilets,
        energyCertificate,
        availabilityDate,
        price,
        description,
        state,
        createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        rooms,
        garage,
        terrace,
        elevator,
        toilets,
        energyCertificate,
        formatDate(new Date()),
        price,
        description,
        state,
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

    // Recuperamos el ID de la propiedad recién creada.
    const [[property]] = await connection.query(
      `
    SELECT idProperty FROM properties WHERE idUser = ? AND createdAt = ? AND flat = ?
    `,
      [userId, createdAt, flat]
    );

    res.send({
      status: 'ok',
      message: 'El piso se ha creado correctamente',
      property: property.idProperty,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newProperty;
