const Joi = require('joi')

/**
 * JOI SCHEMA VALIDATOR WITH EXPECTED
 *  DATA OF CREATION OF LINKS IN DATABASE
 */
const saveForMeSchema = Joi.object({
  email: Joi.string().required(),
  service: Joi.string().required(),
  data: Joi.object({
    id: Joi.string(),
    link: Joi.string().required(),
    title: Joi.string().required(),
    keywords: Joi.array().items(Joi.string()),
    icon: Joi.string(),
  }),
})

module.exports = saveForMeSchema
