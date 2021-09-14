require('dotenv').config();
const express = require('express');
const fileupload = require('express-fileupload');
const morgan = require('morgan');

const app = express();
const { PORT } = process.env;

/**
 * ############################
 * ## Controladores usuarios ##
 * ############################
 */
const newUser = require('./controllers/users/newUser.js');

//Logger

app.use(morgan('dev'));

//Deserealizacion el body

app.use(express.json());

//deserealizamos el body de tipo "form-data"
app.use(fileupload());

/**
 * ########################
 * ## Endpoints usuarios ##
 * ########################
 */
// Crear un usuario.
app.post('/users', newUser);

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
