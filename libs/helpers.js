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
 * ##############
 * ## sendMail ##
 * ##############
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

function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * ####################
 * ## getRandomValue ##
 * ####################
 */

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * ##########################
 * ## generateRandomString ##
 * ##########################
 */

function generateRandomString(lenght) {
  return crypto.randomBytes(lenght).toString('hex');
}

/**
 * ##############
 * ## validate ##
 * ##############
 */

async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
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
