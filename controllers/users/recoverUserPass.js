// @ts-nocheck
const getDB = require('../../config/getDB');

const recoverUserPass = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el email del usuario.
    const { email } = req.body;

    // Si el campo de email está vacío, lanzamos un error.
    if (!email) {
      const error = new Error('Escribe un correo electrónico válido.');
      error.httpStatus = 400;
      throw error;
    }

    // Obtenemos el usuario
    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?
    `,
      [email]
    );

    // Comprobamos que exista el usuario con el email proporcionado. Si no existe, lanzamos error.
    if (user.length < 1) {
      const error = new Error(
        'No existe ningún usuario con ese email, por favor, comprueba que el email sea correcto.'
      );
      error.httpStatus = 404;
      throw error;
    }

    // Generamos el recoverCode,
    const recoverCode = generateRandomString(20);

    // Creamos el cuerpo del email.
    const emailBody = `
        <table>
            <thead>
                <th>Recuperación de contraseña</th>
            </thead>
            <tbody>
                <td>
                    Se ha solicitado un cambio de contraseña para el usuario registrado
                    con este email en Perfect Renter.
                    <br />
                    Haz click en el botón recuperar contraseña para cambiarla.
                    <br />
                    Si no has sido tú, por favor, ignora este email.
                </td>
            </tbody>
            <tfoot>
                <td>
                    <button>
                    <a
                    href="http://localhost:4000/users/reset-password/${idUser}/${recoverCode}"
                    ></a
            >RECUPERAR CONTRASEÑA
            </button>
            </td>
            </tfoot>
        </table>
    `;
    // Envío de email.
    await sendMail({
      to: email,
      subject: 'Cambio de contraseña Perfect Renter',
      body: emailBody,
    });

    // Agregamos código
  } catch (error) {
    next();
  }
};
