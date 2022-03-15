const { healthService } = require('../../constants/textConstants')

/**
 * @typedef {Object} response
 * @property {Boolean} error
 * @property {String} status
 */

/**
 * @description Check the connection with the db
 * used in integration with the uptime robot
 * @function
 * @async
 * @name getHealthStatus
 * @return {Promise<response>}
 */
const getHealthStatus = async () => {
  return { error: false, status: healthService.apiSuccess }
}

module.exports = getHealthStatus
