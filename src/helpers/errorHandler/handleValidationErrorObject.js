/**
 * @description Will handle errors that use the validation error structure logging an array of errors
 * @param {Object} data
 * @param {Object} data.res
 * @param {Object} data.error
 */
const handleValidationErrorObject = ({ res, error }) => {
  return res.status(400).json({
    name: error.name,
    ...(error && error.validations ? { errors: error.validations } : {})
  })
}

module.exports = handleValidationErrorObject
