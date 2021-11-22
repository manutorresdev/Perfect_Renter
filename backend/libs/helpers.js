// @ts-nocheck
require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const { format } = require('date-fns')
const { ensureDir, unlink } = require('fs-extra')
const sharp = require('sharp')
const crypto = require('crypto')
const uuid = require('uuid')
const path = require('path')

const {
  UPLOADS_DIRECTORY,
  SENDGRID_API_KEY: api,
  SENDGRID_FROM: from
} = process.env
sgMail.setApiKey(api)

const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY)
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
async function sendMail ({ to, subject, body }) {
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
        `
  }
  // Enviamos el mensaje.
  await sgMail.send(msg)
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
function formatDate (date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss')
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
function getRandomValue (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * ###############
 * ## savePhoto ##
 * ###############
 */
/**
 * Función que guarda una foto en el servidor y su nombre en la base de datos
 * @param {file} image Entra como parámetro el archivo de imagen que introduce el usuario
 * @returns Un nombre de imagen
 */

async function savePhoto (image) {
  // comprabamos que directorio de salida de imagenes existe
  await ensureDir(uploadsDir)
  console.log('\x1b[43m########\x1b[30m', image, 'FOTOS')
  // Convertimos la imagen a un objeto sharp
  console.log('\x1b[45m%%%%%%%', 'PRE-SHARP')
  console.log(sharp(image.data), 'SHARPED')
  const sharpImage = sharp(image.data)
  console.log('\x1b[45m%%%%%%%', sharpImage)
  // accedemos a los metadatos de la imagen para comprobar su anchura
  const imageInfo = await sharpImage.metadata()

  // definimos el ancho máximos
  const IMAGE_MAX_WIDTH = 1000
  // si el ancho de la imagen supera el máximo redimensionamos la imagen
  if (imageInfo.width > IMAGE_MAX_WIDTH) sharpImage.resize(IMAGE_MAX_WIDTH)

  // generamos un nombre unico a la imagen
  const imageName = `${uuid.v4()}.jpg`
  // creamos la ruta absoluta a la nueva ubicación de la imagen
  const imagePath = path.join(uploadsDir, imageName)
  // guardamos la imagen en el directorio uploads
  await sharpImage.toFile(imagePath)
  // retornamos el nombre del fichero
  console.log('ERROR POR AQUI')
  return imageName
}

/**
 * #################
 * ## deletePhoto ##
 * #################
 */
/**
 * Función que elimina las fotos del disco
 * @param {string} photoName Entra como parámetro el nombre de la imagen
 */
async function deletePhoto (photoName) {
  // Creamos la ruta absoluta al archivo.
  const photoPath = path.join(uploadsDir, photoName)

  // Eliminamos la foto del disco.
  await unlink(photoPath)
}

/**
 * ##########################
 * ## generateRandomString ##
 * ##########################
 */
/**
 * Función que genera un UUID.
 * @param {number} length Cantidad de carácteres.
 * @returns {string} Devuelve un UUID
 */
function generateRandomString (length) {
  return crypto.randomBytes(length).toString('hex')
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
async function validate (schema, data) {
  try {
    await schema.validateAsync(data)
  } catch (error) {
    console.log(error.message)
    error.httpStatus = 400
    throw error
  }
}

module.exports = {
  formatDate,
  getRandomValue,
  deletePhoto,
  savePhoto,
  generateRandomString,
  validate,
  sendMail,
  uploadsDir
}
