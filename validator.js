const Joi = require('joi');

const schemas = {
  '/signin': Joi.object().keys({
    login: Joi.string(),
    password: Joi.string(),
  }),

  '/signup': Joi.object().keys({
    login: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email().optional(),
    invitedBy: Joi.string().optional(),
    birth: Joi.date().max('11-29-1997'),
    sex: Joi.string().regex(/(?:male|female)/),
    agreedWithTerms: Joi.boolean().valid(true)
  }),

  'drinks': Joe.object().key({
    name: Joe.string().min(3).max(30),
    strength: Joe.numeber().positive(),
    code: Joe.string().regex(/^[a-z0-9]+$/i),
    alcoholic: Joi.any().when('strength', {is: Joi.number().greater(0), then: Joi.boolean().valid(true)})
  })

  '/recipes': Joi.object().keys({
    name: Joi.string(),
    ingredients: Joi.array().min(2).items(Joi.object().keys({
        name: Joi.string(),
        weight: Joi.number().integer().positive(),
        photos: Joi.array().items(Joi.string()).optional()
    })).unique('name'),
    photos: Joi.array().items(Joi.string()).optional(),
    portions: Joi.alternatives().try(Joi.string(), Joi.number().greater(0))
 })
};

exports.check = function (schema, body) {
  if (!schemas[schema])  return {};

  return Joi.validate(body, schemas[schema], { presence: 'required' });
};