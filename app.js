require('dotenv').config();
const { PORT } = process.env;
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const express = require('express');
const app = express();

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
const { getUser } = require('./controllers/users');
/**
 * ####################
 * ## USER ENDPOINTS ##
 * ####################
 */

// Obtener información de un usuario.
app.get('/users/:idUser', authUser, userExists, getUser);

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
