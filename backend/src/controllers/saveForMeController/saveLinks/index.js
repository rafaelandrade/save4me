const { BodyPropertyError } = require('errors-stack')
const logger = require('../../../services/logger')
const { errorHandler } = require('../../../helpers')
const { saveForMeService } = require('../../../services')

/**
 * @param {*} res
 * @param {*} req
 * @return {Promise<void>}
 */
const saveLinks = (req, res) => {
  logger.print({ severity: 'info', message: 'Initiation of save links service...' })
  const { email, data, link, inactivate = false } = req.body
  try {
    if (!email) throw new BodyPropertyError({ message: 'Email was not send!' })

    return saveForMeService({
      email,
      data,
      link,
      inactivate,
    })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = saveLinks
