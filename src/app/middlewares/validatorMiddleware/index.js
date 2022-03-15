const { ValidationError } = require('errors-stack')
const { errorHandler } = require('../../../helpers')
const { validationErrors } = require('../../constants').errorTextConstants
const validateGroupParams = require('./validateGroupParams')

/**
 * @typedef {Object} PropertyObject
 * @property {String} type
 * @property {Boolean} required
 * @property {Function} validator
 * @property {Number=} maxLength The maxed length of a string
 * @property {Number=} fixedLength If its passed the string should have the exactly length
 * @property {String=} customError to add a custom error to the error object being trowed
 * @property {Number=} minLength the minimal length of a string
 */

/**
 * @typedef {Object} Fields
 * @property {Object.<string, PropertyObject>=} body
 * @property {Object.<string, PropertyObject>=} params
 * @property {Object.<string, PropertyObject>=} query
 */

/**
 * @description Will run the validations for every field
 * passed in the body/params of the request, each field provide information
 * about how to run the validation and extra params if necessary
 * @param {Fields} fields
 * @returns
 */
const validatorMiddleware = fields => {
  return (req, res, next) => {
    try {
      const errors = []

      for (const [groupKey, groupValues] of Object.entries(fields)) validateGroupParams(errors, groupKey, groupValues, req)
      if (errors.length) throw new ValidationError(validationErrors.failedCall, errors)
      return next()
    } catch (error) {
      return errorHandler({ error, res, event: 'validatorMiddleware' })
    }
  }
}

module.exports = validatorMiddleware
