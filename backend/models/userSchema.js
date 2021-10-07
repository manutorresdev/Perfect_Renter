const Joi = require('joi');
/**
 * @module Schemas
 */
/**
 * Esquema de usuario para validación de datos.
 * @name UserSchema
 */
const userSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un email');

      return new Error('El email no es válido.');
    }),

  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña');

        case 'string.empty':
          return new Error('Se requiere una contraseña');

        default:
          return new Error('La contraseña debe tener entre 8 y 100 caracteres');
      }
    }),
  tel: Joi.number()
    .min(9)
    .error((errors) => {
      return new Error('El teléfono no es válido.');
    }),
  name: Joi.string()
    .required()
    .alphanum()
    .min(3)
    .max(30)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un nombre para el usuario');

      return new Error('El nombre no es válido.');
    }),
  lastName: Joi.string()
    .required()
    .alphanum()
    .min(3)
    .max(30)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un apellido para el usuario');

      return new Error('El apellido no es válido.');
    }),
  bio: Joi.string().min(0).max(255),
  birthDate: Joi.date().required(),
  city: Joi.string().min(0).max(50).required(),
});

const editUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un email');

      return new Error('El email no es válido.');
    }),

  password: Joi.string()
    .min(8)
    .max(100)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña');

        case 'string.empty':
          return new Error('Se requiere una contraseña');

        default:
          return new Error('La contraseña debe tener entre 8 y 100 caracteres');
      }
    }),
  tel: Joi.number()
    .min(9)
    .error((errors) => {
      return new Error('El teléfono no es válido.');
    }),
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un nombre para el usuario');

      return new Error('El nombre no es válido.');
    }),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un apellido para el usuario');

      return new Error('El apellido no es válido.');
    }),
  bio: Joi.string().min(0).max(255),
  birthDate: Joi.date(),
  city: Joi.string().min(0).max(50),
});

module.exports = { userSchema, editUserSchema };
