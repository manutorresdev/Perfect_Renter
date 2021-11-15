// @ts-nocheck

const getDB = require('../../config/getDB');
const jwt = require('jsonwebtoken');
/**
 * @module Users
 */
/**
 * Middleware para loguear un usuario y obtener un token para utilizarlo en la app.
 * @param {*} req Como requests, se piden dos datos. Email y contraseña.
 * @param {*} res El servidor responde generando un token para su posterior utilización.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 * @returns {Promise} Devuelve un token.
 */
const loginUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el email y el password.
    const { email, password } = req.body;

    // Si falta algún dato lanzamos un error.
    if (!email || !password) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos si existe un usuario con ese email y esa contraseña.
    const [user] = await connection.query(
      `SELECT idUser, role, renterActive FROM users WHERE email = ? AND password = SHA2(?, 512)`,
      [email, password]
    );

    // Si el usuario no existe lanzamos un error.
    if (user.length < 1) {
      const error = new Error('Email o contraseña incorrectos.');
      error.httpStatus = 401;
      throw error;
    }

    // Si el usuario existe pero no está activo lanzamos un error.
    if (!user[0].renterActive) {
      const error = new Error('Usuario pendiente de validar.');
      error.httpStatus = 401;
      throw error;
    }

    // Objeto con la información que le queramos pasar al token.

    const tokenInfo = {
      idUser: user[0].idUser,
      role: user[0].role,
    };

    // Creamos el token. Puedo importar .env arriba y poner sólo SECRET
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '30d',
    });

    res.send({
      status: 'ok',
      message:
        'Sesión iniciada con éxito, se te redirigirá a la pantalla principal.',
      token,
      idUser: user[0].idUser,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
