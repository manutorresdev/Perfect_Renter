require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();
const { PORT } = process.env;

// LOGGER
app.use(morgan('dev'));
// BODY DESERIALIZER
app.use(express.json());
// FORM-DATA DESERIALIZER
app.use(fileUpload());

/**
 * ######################
 * ## LIBS MIDDLEWARES ##
 * ######################
 */
const userExists = require('./libs/middlewares/userExists');
const authUser = require('./libs/middlewares/authUser');

/**
 * @module Routes
 */
/**
 * #######################
 * ## FLATS CONTROLLERS ##
 * #######################
 */

/**
 * #####################
 * ## FLATS ENDPOINTS ##
 * #####################
 */

/**
 * ######################
 * ## USER CONTROLLERS ##
 * ######################
 */

const {
  recoverUserPass,
  newUser,
  getUser,
  loginUser,
} = require('./controllers/users/index');

/**
 * ####################
 * ## USER ENDPOINTS ##
 * ####################
 */

// Obtener información de un usuario.
/**
 * Obtener usuario.
 *
 * @name getUser
 * @path {GET} /users/:idUser
 * @code {200} Si la respuesta es correcta
 * @code {401} Si la autorización del usuario es errónea.
 * @code {404} Si el usuario no existe
 * @response {Object} Datos de usuario
 */
app.get('/users/:idUser', authUser, userExists, getUser);

// Recuperación de contraseña.
/**
 * Obtener enlace de recuperación de contraseña.
 *
 * @name recoverUserPass
 * @path {PUT} /users/password/recover
 * @code {200} Si la respuesta es correcta
 * @code {400} Si el correo electrónico no es valido.
 * @code {404} Si el usuario no existe
 * @response {Object} Confirmación recuperación contraseña.
 */
app.put('/users/password/recover', recoverUserPass);

// Agregar un nuevo usuario.
/**
 * Agregar usuario.
 *
 * @name newUser
 * @path {POST} /users
 * @code {200} Si la respuesta es correcta
 * @code {409} Si el correo electrónico ya existe en la base de datos.
 * @response {Object} Confirmación registro.
 */
app.post('/users', newUser);

// Loguear un usuario devolviendo un token
/**
 * Loguear usuario.
 *
 * @name loginUser
 * @path {POST} /users/login
 * @code {200} Si la respuesta es correcta
 * @code {400} Si faltan campos a rellenar.
 * @code {401} Si el email o la contraseña son incorrectos.
 * @response {Object} Devuelve un token.
 */
app.post('/users/login', loginUser);

/**
 * ####################
 * ## ERROR LISTENER ##
 * ####################
 */

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
/**
 * ##########################
 * ## NOT FOUND MIDDLEWARE ##
 * ##########################
 */
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});
/**
 * ####################
 * ## SERVER ON PORT ##
 * ####################
 */
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
