const Joi = require('joi');

let propertySchema;
let editPropertySchema = Joi.object({
  province: Joi.string(),
  adress: Joi.string(),
  zipCode: Joi.number(),
  number: Joi.number(),
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
// {
//   "province": "Joi.string()",
//   "adress": "Joi.string()",
//   "zipCode": "Joi.number()",
//   "number": "Joi.number()",
//   "stair": "Joi.string()",
//   "flat": "Joi.number()",
//   "gate": "Joi.string()",
//   "mts": "Joi.number()",
//   "garage": "Joi.boolean()",
//   "bedrooms": "Joi.number()",
//   "terrace": "Joi.boolean()",
//   "toilets": "Joi.number()",
//   "energyCertificate": "Joi.boolean()",
//   "price": "Joi.number()",
//   "city": "Joi.string()",
//   "estate": "Joi.string()"}
