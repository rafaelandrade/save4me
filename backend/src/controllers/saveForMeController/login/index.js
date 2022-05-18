const logger = require('../../../services/logger')
const { errorHandler } = require('../../../helpers')
const prisma = require('../../../config/prisma')

/**
 * @param {*} res
 * @param {*} req
 * @return {Promise<any>}
 */
const login = async (req, res) => {
  const { email } = req.body
  try {
    logger.print({ severity: 'info', message: 'Initiation of login service...', event: 'loginController' })
    const emailLogin = await prisma.linkContent.findUnique({ where: { email } })

    logger.print({ severity: 'info', message: `The email ${email} already has data on database ${!!emailLogin}`, event: 'loginController' })

    return res.status(200).json({ error: false, login: !!emailLogin })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = login
