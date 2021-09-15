// @ts-nocheck
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { format } = require('date-fns');
const crypto = require('crypto');

const {
  UPLOADS_DIRECTORY,
  SENDGRID_API_KEY: api,
  SENDGRID_FROM: from,
} = process.env;
sgMail.setApiKey(api);

/**
 * @module Helpers
 */

/**
 * ##############
 * ## sendMail ##
 * ##############
 */

/**
 * Función que envía un email con los datos proporcionados en el middleware.
 * @param {*} to Se obtiene el email de destino del correo.
 * @param {*} subject Asunto para el correo a enviar.
 * @param {*} body Contenido del correo electrónico.
 * @param {*} html Estructura del correo electrónico escrito en HTML.
 */
async function sendMail({ to, subject, body }) {
  // Preparamos el mensaje.
  const msg = {
    to,
    from: from,
    subject,
    text: body,
    html: `
            <div>
                <h1>${subject}</h1>
                <p>${body}</p>
            </div>
        `,
  };
  // Enviamos el mensaje.
  await sgMail.send(msg);
}

/**
 * ################
 * ## formatDate ##
 * ################
 */
/**
 * Función que genera una fecha en un formato en concreto.
 * @param {*} date Parámetro obtenido del middleware que lo utilice. Es una fecha en formato JS
 * @returns Devuelve una fecha en formato legible para la base de datos. (SQL)
 */
function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * ####################
 * ## getRandomValue ##
 * ####################
 */
/**
 * Función que genera un número aleatorio entre dos números.
 * @param {*} min Valor mínimo del número aleatorio a mostrar.
 * @param {*} max Valor máximo del número aleatorio a mostrar.
 * @returns {number} Devuelve un número entero entre los dos valores indicados.
 */
function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * ##########################
 * ## generateRandomString ##
 * ##########################
 */
/**
 * Función que genera un UUID.
 * @param {number} lenght Cantidad de carácteres.
 * @returns {string} Devuelve un UUID
 */
function generateRandomString(lenght) {
  return crypto.randomBytes(lenght).toString('hex');
}

/**
 * ##############
 * ## validate ##
 * ##############
 */
/**
 * Función que valida los carácteres introducidos por el usuario.
 * @param {Object} schema Esquema de validación de datos.
 * @param {*} data Datos introducidos por el usuario, provienen del req.body.
 */
async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    console.log(error.message);
    error.httpStatus = 400;
    throw error;
  }
}
module.exports = {
  formatDate,
  getRandomValue,
  generateRandomString,
  validate,
  sendMail,
};
