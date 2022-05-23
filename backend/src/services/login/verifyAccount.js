const jwt = require('jsonwebtoken')
const logger = require('../logger')
const keys = require('../../config/keys')

/**
 * @async
 * @function verifyAccount
 * @description Function responsible for verify account
 * @param {Object} data - Service object
 * @param {Object} data.user
 * @param {String} data.email
 * @returns {Object}
 */
const verifyAccount = ({ user, email }) => {
  logger.print({ severity: 'info', message: `Verification of user with ${email} finished...`, event: 'createAccount' })
  const token = jwt.sign({ user_id: user.id, email }, keys.authTokens.adminToken, { expiresIn: '2h' })

  return { error: false, email: user?.email, token }
}

module.exports = verifyAccount
