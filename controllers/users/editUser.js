const getDB = require('../../config/getDB');
const {
  deletePhoto,
  savePhoto,
  formatDate,
  generateRandomString,
  sendMail,
  validate,
} = require('../../libs/helpers');
const userSchema = require('../../models/userSchema');

/**
 * @module Users
 */
/**
 * Middleware para editar los datos de un usuario
 * @param {*} req Como "requests", se requiere el id del usuario que solicita la petición y el id del usuario que se quiere editar, si no coincide se lanza un error
 * @param {*} res El servidor lanza como respuesta que los datos han sido actualizados
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay
 */

const editUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario que queremos modificar.
    const { idUser } = req.params;

    // Obtenemos el id del usuario que hace la request.
    const idReqUser = req.userAuth.idUser;

    // Obtenemos los datos editables
    const { name, email, lastname, tel, bio, city, birthDate } = req.body;

    // Validamos los datos recibidos.
    await validate(userSchema, req.body);

    console.log(req.body);

    // Lanzamos un error en caso de que no seamos dueños de este usuario.
    if (Number(idUser) !== idReqUser) {
      const error = new Error('No tienes permisos para editar este usuario');
      error.httpStatus = 403;
      throw error;
    }

    // Si no llega ningún dato lanzamos un error.
    if (
      !name &&
      !email &&
      !lastname &&
      !tel &&
      !bio &&
      !city &&
      birthDate &&
      !(req.files && req.files.avatar)
    ) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // Obtenemos los datos del usuario actual.
    const [user] = await connection.query(
      `SELECT email, name, lastname, tel, bio, city, birthDate, avatar FROM users WHERE idUser = ?`,
      [idUser]
    );

    // Obtenemos la fecha de modificación.
    const modifiedAt = formatDate(new Date());

    /**
     * ############
     * ## Avatar ##
     * ############
     *
     * Actualizamos Avatar.
     *
     */
    if (req.files && req.files.avatar) {
      // Comprobamos si el usuario ya tiene un avatar previo.
      // De ser así eliminamos el avatar del disco.
      if (user[0].avatar) await deletePhoto(user[0].avatar);

      // Guardamos la foto el disco y obtenemos su nombre.
      const avatarName = await savePhoto(req.files.avatar);

      // Guardamos el avatar en la base de datos.
      await connection.query(
        `UPDATE users SET avatar = ?, modifiedAt = ? WHERE idUser = ?`,
        [avatarName, modifiedAt, idUser]
      );
    }

    /**
     * ##########
     * ## Name ##
     * ##########
     *
     * Actualizamos el nombre.
     *
     */
    if (name && user[0].name !== name) {
      await connection.query(
        `UPDATE users SET name = ?, modifiedAt = ? WHERE idUser = ?`,
        [name, modifiedAt, idUser]
      );
    }
    {
      /**
       * ###########
       * ## Email ##
       * ###########
       *
       * Actualizamos email.
       *
       */
      if (email && email !== user[0].email) {
        // Comprobamos que el nuevo email no exista en la base de datos.
        const [existingEmail] = await connection.query(
          `SELECT idUser FROM users WHERE email = ?`,
          [email]
        );

        // Si el email ya existe lanzamos un error.
        if (existingEmail.length > 0) {
          const error = new Error(
            'Ya existe un usuario con ese email en la base de datos'
          );
          error.httpStatus = 409;
          throw error;
        }

        // Creamos un código de registro de un solo uso.
        const registrationCode = generateRandomString(20);

        // Enviamos un mensaje de verificación al nuevo email del usuario.
        // Mensaje que enviaremos al usuario.
        const emailBody = `
    <table>
      <thead>
          <th>Verificación de usuario</th>
      </thead>
      <tbody>
          <td>
            Hola ${name}.
            Acabas de modificar el email en Perfect Renter
            ¡Pulsa el botón para verificar el nuevo correo!
          </td>
      </tbody>
      <tfoot>
          <th>
            <button>
            <a href="${process.env.PUBLIC_HOST}/users/validate/${registrationCode}">VERIFICAR</a>
            </button>
          </th>
      </tfoot>
    </table>
      `;

        try {
          // Enviamos el mensaje al correo del usuario.
          await sendMail({
            to: email,
            subject: 'Activa tu usuario de Perfect Renter',
            body: emailBody,
          });
        } catch (error) {
          throw new Error('Error enviando el mensaje de verificación');
        }

        // Actualizamos el usuario en la base de datos junto al código de registro.
        await connection.query(
          `UPDATE users SET email = ?, registrationCode = ?, renterActive = false, createdAt = ? WHERE idUser = ?`,
          [email, registrationCode, modifiedAt, idUser]
        );
      }
    }
    /**
     * ##############
     * ## Lastname ##
     * ##############
     *
     * Actualizamos apellido.
     *
     */
    if (lastname && user[0].lastname !== lastname) {
      await connection.query(
        `UPDATE users SET lastname = ?, modifiedAt = ? WHERE idUser = ?`,
        [lastname, modifiedAt, idUser]
      );
    }
    /**
     * ##############
     * ## Teléfono ##
     * ##############
     *
     * Actualizamos teléfono.
     *
     */
    if (tel && user[0].tel !== tel) {
      await connection.query(
        `UPDATE users SET tel = ?, modifiedAt = ? WHERE idUser = ?`,
        [tel, modifiedAt, idUser]
      );
    }

    /**
     * ##############
     * ## Biografía ##
     * ##############
     *
     * Actualizamos la biografía.
     *
     */
    if (bio && user[0].bio !== bio) {
      await connection.query(
        `UPDATE users SET bio = ?, modifiedAt = ? WHERE idUser = ?`,
        [bio, modifiedAt, idUser]
      );
    }
    /**
     * ##############
     * ##  Ciudad  ##
     * ##############
     *
     * Actualizamos ciudad.
     *
     */
    if (city && user[0].city !== city) {
      await connection.query(
        `UPDATE users SET city = ?, modifiedAt = ? WHERE idUser = ?`,
        [city, modifiedAt, idUser]
      );
    }
    /**
     * ########################
     * ##  Fecha nacimiento  ##
     * ########################
     *
     * Actualizamos la fecha.
     *
     */
    if (birthDate && user[0].birthDate !== birthDate) {
      await connection.query(
        `UPDATE users SET birthDate = ?, modifiedAt = ? WHERE idUser = ?`,
        [birthDate, modifiedAt, idUser]
      );
    }
    res.send({
      status: 'ok',
      message: 'Datos de usuario actualizados',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
