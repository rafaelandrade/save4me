const responseTime = require('response-time')
const { logger } = require('../../../helpers')

module.exports = app => {
  app.use(
    responseTime((req, res, time) => {
      logger.info(`[response_time]: ${time}ms`, 'responseTime')
    })
  )
}
