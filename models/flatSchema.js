const Joi = require('joi');
/**
 * @module Schemas
 */
/**
 * Esquema de usuario para validación de datos.
 * @name propertychema
 */

/*************************************************************************/
/************https://github.com/IagoLast/pselect ***********************/
/**Libreria para hacer seleccionables las provincias y ciudades de españa */
/************************************************************************* */

const propertychema = Joi.object().keys({
  city: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Indique la ciudad del Piso');
    }),
  province: Joi.string()
    .required()
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una provincia');
        case 'string.empty':
          return new Error('Se requiere una provincia');
        default:
          return new Error('Indique la provincia');
      }
    }),
  address: Joi.string()
    .required()
    .max(100)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Indique la dirección exacta del piso');
    }),
  edifice: Joi.string()
    .required()
    .max(50)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Indique si es un edificio o casa.');
      return new Error('Datos no validos edificio');
    }),

  stair: Joi.string(),
  Property: 

  mts: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('indique los mts2 del piso');
    }),
  bedrooms: Joi.number()
    .required()
    .min(1)
    .max(2)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requieren las habitaciones del piso, minimo 1.');
    }),
  price: Joi.number().required(),
  estate: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('"reservado", "alquilado", "disponible"');
    }),
  stairs: Joi.string().max(50),
});

module.exports = propertychema;
