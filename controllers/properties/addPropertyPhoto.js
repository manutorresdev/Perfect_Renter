// @ts-nocheck
const getDB = require('../../config/getDB');
const { savePhoto, formatDate } = require('../../libs/helpers');
/**
 * @module Entries
 */
/**
 * Middleware que guarda las fotos de los inmuebles.
 * @param {*} req Como "requests", se requiere el id del inmueble
 * @param {*} res El servidor guarda la foto y obtenemos el nombre de la misma. Si no llega la foto o se supera el número máximo de fotos, lanza un error
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const addPropertyPhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos id del inmueble
    const { idProperty } = req.params;

    //si no recibimos foto lanzamos error
    if (!req.files || !req.files.photo) {
      const error = new Error('No se ha encontrado el archivo');
      error.httpStatus = 400;
      throw error;
    }

    //comprobamos las fotos de la entrada
    const [photos] = await connection.query(
      `SELECT idPhoto FROM photos where idProperty = ?`,
      [idProperty]
    );
    //si hay 10 fotos lanzamos error
    if (photos.length >= 10) {
      const error = new Error('Esta entrada ya tiene diez fotos');
      error.httpStatus = 403;
      throw error;
    }

    let photoName;
    try {
      //guardamos la foto en el servidor y obtenemos el nombre de la misma
      photoName = await savePhoto(req.files.photo);
    } catch (_) {
      const error = new Error('Formato de archivo incorrecto');
      error.httpStatus = 400;
      throw error;
    }

    //guardamos foto
    await connection.query(
      `INSERT INTO photos (name, idProperty, createdAt) VALUES (?, ?, ?)`,
      [photoName, idProperty, formatDate(new Date())]
    );
    res.send({
      status: 'ok',
      message: 'La foto ha sido guardada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addPropertyPhoto;
