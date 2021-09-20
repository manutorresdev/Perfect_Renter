const Joi = require('joi');

const propertySchema = Joi.object({
  province: Joi.string().required(),
  address: Joi.string().required(),
  zipCode: Joi.string().required().max(5),
  number: Joi.number().required(),
  type: Joi.string().required(),
  stair: Joi.string().required(),
  flat: Joi.number().required(),
  gate: Joi.string().required(),
  mts: Joi.number().required(),
  garage: Joi.number().required(),
  bedrooms: Joi.number().required(),
  terrace: Joi.number().required(),
  toilets: Joi.number().required(),
  energyCertificate: Joi.number().required(),
  price: Joi.number().required(),
  city: Joi.string().required(),
  estate: Joi.string().required(),
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
  bedrooms: Joi.number(),
  terrace: Joi.number(),
  toilets: Joi.number(),
  energyCertificate: Joi.number(),
  price: Joi.number(),
  city: Joi.string(),
  estate: Joi.string(),
});

module.exports = {
  propertySchema,
  editPropertySchema,
};
