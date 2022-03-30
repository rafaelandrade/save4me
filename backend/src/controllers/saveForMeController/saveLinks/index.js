const logger = require('../../../services/logger')
const { errorHandler } = require('../../../helpers')
const { saveForMeService } = require('../../../services')

/**
 * @param {*} res
 * @param {*} req
 * @return {Promise<any>}
 */
const saveLinks = async (req, res) => {
  const { email, data, service } = req.body
  try {
    logger.print({
      severity: 'info',
      message: `Initiation of service: ${service} with follow data: ${logger.beautify(data)} `,
      event: 'saveLinksRoute',
    })

    const response = await saveForMeService({
      email,
      data,
      service,
    })
    return res.status(200).json({ error: false, message: response })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = saveLinks
