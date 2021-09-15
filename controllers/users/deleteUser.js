const getDB = require('../../config/getDB');
const {
  /* deletePhoto, */
  generateRandomString,
  formatDate,
} = require('../../libs/helpers');
/**
 * @module Users
 */
/**
 * Middleware para eliminar un usuario de la base de datos.
 * @param {*} req Como "requests", se requiere el id del usuario que solicita la petición y el id del usuario que se quiere eliminar.
 * @param {*} res El servidor lanza como respuesta que el usuario ha sido eliminado.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const deleteUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos id del usuario que queremos borrar
    const { idUser } = req.params;

    //importante lo primero es que no se pueda eliminar el administrador

    if (Number(idUser) === 1) {
      const error = new Error(
        'El administrador principal no se puede eliminar'
      );
      error.httpStatus = 403;
      throw error;
    }

    // si el usuario que realiza la petición no es el dueño de la cuenta o no es
    //administrador lanzamos error
    if (
      req.userAuth.idUser !== Number(idUser) &&
      req.userAuth.role !== 'admin'
    ) {
      const error = new Error('No tienes permisos');
      error.httpStatus = 403;
      throw error;
    }

    // Obtenemos el nombre del avatar
    const [user] = await connection.query(
      `SELECT avatar FROM users WHERE idUser = ?`,
      [idUser]
    );

    // Si el usuario tiene avatar lo borramos del disco
    if (user[0].avatar) {
      await deletePhoto(user[0].avatar);
    }
    //Anonimizamos al usuario
    await connection.query(
      `UPDATE users SET password = ?, name = "[deleted]", avatar = NULL, renterActive = false, deleted = true, modifiedAt = ? WHERE idUser = ?`,
      [generateRandomString(40), formatDate(new Date()), idUser]
    );
    res.send({
      status: 'ok',
      message: 'usuario eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
