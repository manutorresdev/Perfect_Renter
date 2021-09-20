// @ts-nocheck
const getDB = require('../../config/getDB');
const { formatDate } = require('../../libs/helpers');

/**
 * @module Entries
 */
/**
 * Middleware para votar un alquiler o un usuario dependiendo del path
 * @param {*} req Como "requests", se requiere el id del usuario/alquiler a votar, y el id del usuario que llega a traves del token. Además del voto y el comentario
 * @param {*} res El servidor lanza como respuesta que la votación ha sido realizada con éxito
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */
const newVote = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario que está votando
    const { idUser: idReqUser } = req.userAuth;

    // Creamos la fecha de votación
    const date = formatDate(new Date());

    // Si el usuario está votando una propiedad, entramos en el siguiente condicional.
    if (req.route.path.includes('properties')) {
      // Obtenemos id de la propiedad a votar
      const { idProperty } = req.params;

      // Obtenemos el voto y el comentario del usuario
      const { voteValue, commentary } = req.body;

      // Seleccionamos la relación entre inquilino y casero, de haberla
      const [vote] = await connection.query(
        `
        SELECT idUser, idVoted,idVote FROM votes WHERE idProperty = ? AND idUser = ?
        `,
        [idProperty, idReqUser]
      );

      // Si no hay relación entre inquilino y casero, lanzamos error
      if (vote.length < 1) {
        const error = new Error(
          'No puedes votar un alquiler en el que no has estado.'
        );
        error.httpStatus = 403;
        throw error;
      }

      // Comprobamos que el usuario que vota y el propietario son diferentes
      if (vote[0].idVoted === idReqUser) {
        const error = new Error('No te puedes votar a ti mismo.');
        error.httpStatus = 403;
        throw error;
      }

      // Si no hay voto, lanzamos error
      if (!voteValue) {
        const error = new Error('Faltan Campos');
        error.httpStatus = 400;
        throw error;
      }

      // Comprobamos que el valor del voto esté entre 1 y 5
      if (voteValue > 5 || voteValue < 1) {
        const error = new Error(
          'El voto debe ser un valor entero entre 1 y 5.'
        );
        error.httpStatus = 400;
        throw error;
      }

      // Insertamos el valor del voto y el comentario del mismo
      await connection.query(
        `
      UPDATE votes SET voteValue = ?, commentProperty = ?, modifiedAt = ? WHERE idVote = ?
      `,
        [voteValue, commentary, date, vote[0].idVote]
      );
    }

    // Si el usuario está votando un usuario, entramos en el siguiente condicional.
    if (req.route.path.includes('users')) {
      // Obtenemos id del usuario a votar
      const { idUser } = req.params;

      // Obtenemos el voto y el comentario del usuario
      const { commentary, voteValueRenter } = req.body;

      // Comprobamos que el usuario que vota y el votado son diferentes
      if (Number(idUser) === idReqUser) {
        const error = new Error('No te puedes votar a ti mismo.');
        error.httpStatus = 403;
        throw error;
      }

      // Seleccionamos la relación entre inquilino y casero (idReqUser = casero)
      const [vote] = await connection.query(
        `
        SELECT idUser, idVote FROM votes WHERE idUser = ? AND idVoted = ?
        `,
        [idUser, idReqUser]
      );

      // Si no hay relación entre inquilino y casero, lanzamos error
      if (vote.length < 1) {
        const error = new Error(
          'No puedes votar un usuario con el que no has tenido relación.'
        );
        error.httpStatus = 403;
        throw error;
      }

      // Si no hay voto, lanzamos error
      if (!voteValueRenter) {
        const error = new Error('Faltan Campos');
        error.httpStatus = 400;
        throw error;
      }

      // Comprobamos que el valor del voto esté entre 1 y 5
      if (voteValueRenter > 5 || voteValueRenter < 1) {
        const error = new Error(
          'El voto debe ser un valor entero entre 1 y 5.'
        );
        error.httpStatus = 400;
        throw error;
      }

      // Insertamos el valor del voto y el comentario del mismo
      await connection.query(
        `
      UPDATE votes SET voteValueRenter = ?, commentRenter = ?, modifiedAt = ? WHERE idVote = ?
      `,
        [voteValueRenter, commentary, date, vote[0].idVote]
      );
    }

    res.send({
      status: 'ok',
      message: 'El voto ha sido creado con éxito.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newVote;
