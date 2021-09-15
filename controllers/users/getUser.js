const getDB = require('../../config/getDB');

const getUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el id del usuario.
    const { idUser } = req.params;

    //Obtenemos el id del usuario que hace la request
    const idReqUser = req.userAuth.id;

    //Obtenemos los datos del usuario
    const [user] = await connection.query(
      `
            SELECT nif, name, lastName, tel, email, avatar, role, createdAt FROM users WHERE idUser= ?`,
      [idUser]
    );

    //Objeto con la info basica del usuario
    const userInfo = {
      name: user[0].name,
      lastName: user[0].lastName,
      avatar: user[0].avatar,
    };

    //Usuario propietario
    if (user[0].id === idReqUser || req.userAuth.role === 'admin') {
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
