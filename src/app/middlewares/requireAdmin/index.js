const { UnauthorizedError } = require('errors-stack')

const { errorHandler } = require('../../../helpers')
const keys = require('../../../config/keys')
const { errorTextConstants } = require('../../constants')

const { authorizationErrors } = errorTextConstants

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization) throw new UnauthorizedError({ message: authorizationErrors.invalidToken })

    if (authorization === keys.authTokens.adminToken) {
      req.body.adminFullAccess = true
      req.body.employee = 'SYSTEM'
      return next()
    }

    // const token = await TokenService.getEmployeeByToken(authorization)
    // if (!token) throw new UnauthorizedError({ message: authorizationErrors.invalidToken })

   // req.body.employee = token.employee
   // if (token.hasFullAccess === true) req.body.adminFullAccess = true

    return next()
  } catch (error) {
    return errorHandler({ error, res, event: 'requireAdminMiddleware' })
  }
}
