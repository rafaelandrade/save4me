//* middlewares/Validator.js
const { InternalServiceError, BodyPropertyError } = require('errors-stack')
//* Include joi to check error type

const Validator = require('./validators')

module.exports = function (validator) {
  if (!validator) { throw new Error('\'Validator was not send!') }

  return async function (req, res, next) {
    try {
      const validated = await Validator[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      if (err.isJoi) {
        return next(new BodyPropertyError(err.message))
      }
      next(new InternalServiceError(err.message))
    }
  }
}
