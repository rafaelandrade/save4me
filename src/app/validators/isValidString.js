const { isString } = require('lodash')

/**
 * @description Will validate if some property is a valid type string
 * @param {Object} data
 * @param {string} data.string
 * @param {number=} [data.maxLength=null]
 * @param {number=} [data.minLength=null]
 * @param {number=} [data.fixedLength=null]
 * @return {boolean}
 */
const isValidString = ({ string, maxLength = null, fixedLength = null, minLength = null }) => {
  if (
    !string ||
    isString(string) === false ||
    (maxLength && string.length > maxLength) ||
    (minLength && string.length < minLength)
  ) {
    return false
  }
  if (fixedLength && string.length !== fixedLength) return false
  return true
}

module.exports = isValidString
