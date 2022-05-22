const bcrypt = require('bcrypt')
const logger = require('../../../services/logger')
const { errorHandler } = require('../../../helpers')
const prisma = require('../../../config/prisma')

const { create, verify } = require('../../../services/login')

/**
 * @param {*} res
 * @param {*} req
 * @return {Promise<any>}
 */
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    logger.print({ severity: 'info', message: 'Initiation of login service...', event: 'loginController' })
    const hasUser = await prisma.user.findUnique({ where: { email } })

    if (!hasUser) {
      const response = await create({ email, password })
      return res.status(201).json(response)
    }

    if (hasUser && (await bcrypt.compare(password, hasUser.password))) {
      const response = await verify({ user: hasUser, email })

      return res.status(201).json(response)
    }

    return res.status(400).json({ error: true, message: await bcrypt.compare(password, hasUser.password) })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = login
