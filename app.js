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
} = require('./controllers/users/index');

/**
 * ####################
 * ## USER ENDPOINTS ##
 * ####################
 */

// Obtener información de un usuario.
app.get('/users/:idUser', authUser, userExists, getUser);

// Recuperación de contraseña.

app.put('/users/recover-password', recoverUserPass);

// Agregar un nuevo usuario.
app.post('/users', newUser);

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
