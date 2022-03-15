const { BodyPropertyError, ParamPropertyError, QueryPropertyError } = require('errors-stack')
const { isFunction } = require('lodash')
const { validationErrors } = require('../../constants').errorTextConstants
const buildParams = require('./buildParams')

/**
 * @description Will run the validators according to dataType
 * and log the errors according to dataType and property name
 * @function
 * @param {Array} errors
 * @param {String} groupKey
 * @param {Object} groupValues
 * @param {Object} req
 * @return {void}
 */
const validateGroupParams = (errors, groupKey, groupValues, req) => {
  const validatorExceptions = {
    body: BodyPropertyError,
    params: ParamPropertyError,
    query: QueryPropertyError
  }

  for (const [key, value] of Object.entries(groupValues)) {
    const { required, customError, validator } = value

    if (!isFunction(validator)) {
      errors.push(new validatorExceptions[groupKey](validationErrors.validatorNotFound))
      continue
    }

    const currentObject = req[groupKey]
    const property = req[groupKey][key]
    const errorPrefix = `${groupKey}PropertyError: ${key}`
    const errorObject = new validatorExceptions[groupKey](customError || validationErrors.requiredProp(key), errorPrefix)
    const hasProperty = currentObject.hasOwnProperty(key)

    if (required && !hasProperty) {
      errors.push(errorObject)
      continue
    }

    if (!hasProperty) continue
    if (validator(buildParams(property, value, errors)) || (!required && property === null)) continue
    errors.push(errorObject)
  }
}

module.exports = validateGroupParams
