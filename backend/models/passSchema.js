const Joi = require('joi');
/**
 * @module Schemas
 */

/**
 * Esquema de contraseña para validación de datos.
 * @name PassSchema
 */
const passSchema = Joi.object().keys({
  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña.');

        case 'string.empty':
          return new Error('Se requiere una contraseña.');

        default:
          return new Error(
            'La contraseña debe tener entre 8 y 100 caracteres.'
          );
      }
    }),
});

module.exports = {
  passSchema,
};
