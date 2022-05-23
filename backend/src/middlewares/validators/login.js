const Joi = require('joi')

/**
 * JOI SCHEMA VALIDATOR WITH EXPECTED
 *  EMAIL TO VERIFY LOGIN
 */
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = loginSchema
