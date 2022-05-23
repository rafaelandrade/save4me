const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../logger')
const prisma = require('../../config/prisma')
const keys = require('../../config/keys')

/**
 * @async
 * @function createAccount
 * @description Function responsible for create account in database
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {String} data.password
 * @returns {Promise<Object>}
 */
const createAccount = async ({ email, password }) => {
  logger.print({ severity: 'info', message: `Creating account for user with email ${email}...`, event: 'createAccount' })
  const encryptedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({ data: { email, password: encryptedPassword } })

  const token = jwt.sign({ user_id: user.id, email }, keys.authTokens.adminToken, { expiresIn: '2h' })
  return { error: false, email: user?.email, token }
}

module.exports = createAccount
