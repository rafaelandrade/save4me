const { BodyPropertyError } = require('errors-stack')
const logger = require('../../../services/logger')
const { errorHandler } = require('../../../helpers')

/**
 * @param {*} res
 * @return {Promise<void>}
 */
const saveLinks = (req, res) => {
  logger.info(`Initiation of save links service...`)
  const { email, data, link } = req.body
  try {
    if (!email) throw new BodyPropertyError({ message: 'Email was not send!' })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = saveLinks
