const getDB = require('../../config/getDB');

const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el usuario.
    const [user] = await connection.query(
      `SELECT idUser FROM users WHERE id = ? AND deleted = false`,
      [idUser]
    );

    // Si el usuario no existe lanzamos un error.
    if (user.length < 1) {
      const error = new Error('El usuario no existe');
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
