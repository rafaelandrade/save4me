const { pick } = require('lodash')

/**
 * @param {*} bodyProperty
 * @param {Object} value
 * @returns {Object}
 */
const buildParams = (bodyProperty, value, errors) => {
  return {
    [value.type]: bodyProperty,
    errors,
    ...pick(value, ['minLength', 'maxLength', 'fixedLength'])
  }
}

module.exports = buildParams
