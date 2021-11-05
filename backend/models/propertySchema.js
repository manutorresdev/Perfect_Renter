const Joi = require('joi');
/**
 * @module Schemas
 */

/**
 * Esquema de propiedades para validación de datos.
 * @name PropertySchema
 */
const propertySchema = Joi.object({
  province: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una provincia.');

      return new Error('La provincia no es válida.');
    }),
  address: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una dirección.');

      return new Error('La dirección no es válida.');
    }),
  zipCode: Joi.string()
    .required()
    .max(5)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un código postal.');

      return new Error('El código postal no es válido.');
    }),
  number: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un número de vivienda.');

      return new Error('El número de vivienda no es válido.');
    }),
  type: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere el tipo de vivienda.');

      return new Error('El tipo de vivienda no es válido.');
    }),
  stair: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una escalera.');

      return new Error('La escalera no es válida.');
    }),
  flat: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un piso.');

      return new Error('El piso no es válido.');
    }),
  gate: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una puerta.');

      return new Error('La puerta no es válida.');
    }),
  mts: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requieren los metros cuadrados.');

      return new Error('Los metros cuadrados no son válidos.');
    }),
  garage: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere específicar si hay o no garaje.');

      return new Error('El garaje no es válido.');
    }),
  rooms: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere mínimo una habitación.');

      return new Error('Las habitaciones no son válidas.');
    }),
  terrace: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere especificar si hay o no terraza.');

      return new Error('La terraza no es válida.');
    }),
  elevator: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere especificar si hay o no ascensor.');

      return new Error('El ascensor no es válido.');
    }),
  toilets: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere especificar los baños.');

      return new Error('Los baños no son válidos.');
    }),
  energyCertificate: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un certificado de energía.');

      return new Error('El certificado de energía no es válido.');
    }),
  price: Joi.number()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un precio mensual.');

      return new Error('El precio no es válido.');
    }),
  description: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una descripción.');

      return new Error('La descripción no es válida.');
    }),
  city: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una ciudad.');

      return new Error('La ciudad no es válida.');
    }),
  state: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error(
          'Se requiere especificar un estado(reservado, libre, alquilado).'
        );

      return new Error('El estado no es válido.');
    }),
});

const editPropertySchema = Joi.object({
  province: Joi.string(),
  address: Joi.string(),
  zipCode: Joi.string().max(5),
  number: Joi.number(),
  type: Joi.string(),
  stair: Joi.string(),
  flat: Joi.number(),
  gate: Joi.string(),
  mts: Joi.number(),
  garage: Joi.number(),
  rooms: Joi.number(),
  terrace: Joi.number(),
  elevator: Joi.number(),
  toilets: Joi.number(),
  energyCertificate: Joi.number(),
  price: Joi.number(),
  description: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
});
module.exports = {
  propertySchema,
  editPropertySchema,
};
