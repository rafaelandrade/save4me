const { errorHandler } = require('../../helpers')
const logger = require('../../services/logger')

/**
 * @function
 * @param {*} _req
 * @param {*} res
 * @return {Promise<void>}
 */
const healthController = (_req, res) => {
  try {
    logger.print({ severity: 'info', message: 'HealthController', event: 'healthController' })
    return res.status(200).json({ error: false, message: 'OK!' })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = healthController
