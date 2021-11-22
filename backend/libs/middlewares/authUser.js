// @ts-nocheck
const jwt = require('jsonwebtoken')
/**
 *
 * @module Helpers
 */
/**
 * Middleware para la correcta autorización de un usuario en el servidor.
 * @param {*} req Se obtiene la cabecera de autorización del token y desencriptamos el token para obtener el ID y el ROL del usuario en cuestión.
 * @param {*} res No se obtiene respuesta del servidor en este middleware, a no ser que haya un error.
 * @param {*} next Envía al siguiente middleware, si existe. O lanza errores si los hay.
 */
const authUser = async (req, res, next) => {
  try {
    // Obtenemos la cabecera de autorización.
    const { authorization } = req.headers

    // Si no existe la cabecera de autorización lanzamos un error.
    if (!authorization) {
      const error = new Error('Falta la cabecera de autorización')
      error.httpStatus = 401
      throw error
    }

    // Variable que almacenará la info del token.
    let tokenInfo

    try {
      // Desencriptamos el token.
      tokenInfo = jwt.verify(authorization, process.env.SECRET)
    } catch (_) {
      const error = new Error('El token no es válido')
      error.httpStatus = 401
      throw error
    }

    // Inyectamos en el objeto "request" la info del token: id, role.
    req.userAuth = tokenInfo
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authUser
