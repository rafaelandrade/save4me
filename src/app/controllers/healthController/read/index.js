const HealthService = require('../../../services/HealthService')
const { errorHandler } = require('../../../../helpers')

/**
 * @typedef {import('../../../services/HealthService/getHealthStatus').response} apiResponse
 */

/**
 * @param {*} res
 * @return {Promise<apiResponse>}
 */
module.exports = async (req, res) => {
  try {
    const apiResponse = await HealthService.getHealthStatus()
    return res.status(200).json(apiResponse)
  } catch (error) {
    return errorHandler({ res, error, event: 'readHealth' })
  }
}
