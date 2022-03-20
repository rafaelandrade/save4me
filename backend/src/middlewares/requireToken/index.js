const { UnauthorizedError } = require('errors-stack')
const keys = require('../../config/keys')

/**
 * @description Validate requests from the health endpoint
 * @function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const requireToken = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization === keys.authTokens.adminToken) {
    return next()
  }

  const unauthorizedError = new UnauthorizedError({ message: 'Invalid health token' })
  return res.status(401).json({ error: true, message: unauthorizedError.message })
}

module.exports = requireToken
