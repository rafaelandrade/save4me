const { UnauthorizedError } = require('errors-stack')
const keys = require('../../../config/keys')
const { authorizationErrors } = require('../../constants/errorTextConstants')

const { invalidToken } = authorizationErrors

/**
 * @description Validate requests from the health endpoi
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization === keys.authTokens.healthToken) {
    return next()
  }

  const unauthorizedError = new UnauthorizedError({ message: invalidToken })
  return res.status(401).json({ error: true, message: unauthorizedError.message })
}
