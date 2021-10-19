const getDB = require('../../config/getDB');
/**
 * @module Users
 */
/**
 * Middleware para listar un usuario en concreto
 * @param {*} req Necesaria la autenticación con un "token", en la que se encuentra el ID del usuario iniciado. Además del id del usuario a obtener información en los path params
 * @param {*} res Como respuesta, obtienes un objeto con los datos del usuario
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 * @returns {Promise} Devuelve un objeto con los datos
 */
const getUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el id del usuario.
    const { idUser } = req.params;

    //Obtenemos el id del usuario que hace la request
    const idReqUser = req.userAuth.idUser;

    //Obtenemos los datos del usuario
    const [user] = await connection.query(
      `
            SELECT idUser, name, lastName, tel, email, avatar, role, bio, createdAt FROM users WHERE idUser = ?`,
      [idUser]
    );

    //Objeto con la info basica del usuario
    const userInfo = {
      idUser: user[0].idUser,
      name: user[0].name,
      lastName: user[0].lastName,
      avatar: user[0].avatar,
      bio: user[0].bio,
    };
    console.log(user[0].idUser);
    console.log(idReqUser);
    //Usuario propietario
    if (user[0].idUser === idReqUser || req.userAuth.role === 'admin') {
      userInfo.email = user[0].email;
      userInfo.role = user[0].role;
      userInfo.createdAt = user[0].createdAt;
    }

    res.send({
      status: 'ok',
      userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUser;
