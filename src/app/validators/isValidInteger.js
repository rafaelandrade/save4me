/**
 * @description Will validate if some property is a valid type integer
 * @param {Object} data
 * @param {Object} data.integer
 * @return {boolean}
 */
const isValidInteger = ({ integer }) => {
  if (integer === undefined || integer === null || isNaN(integer)) return false
  return true
}

module.exports = isValidInteger
