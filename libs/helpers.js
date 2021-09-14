const { format } = require('date-fns');
const crypto = require('crypto');

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
 * ##################
 * ## validate    ###
 * ##################
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
};
