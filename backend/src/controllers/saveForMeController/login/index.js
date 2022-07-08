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
  try {
    const { email, password } = req.body

    logger.print({ severity: 'info', message: 'Initiation of login service...', event: 'loginController' })
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      const response = await create({ email, password })

      return res.status(201).json(response)
    }

    const hasSamePassword = await bcrypt.compare(password, user.password)

    if (hasSamePassword) {
      const response = verify({ user, email })

      return res.status(201).json(response)
    }

    return res.status(400).json({ error: true, message: 'Incorrect password!' })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = login
