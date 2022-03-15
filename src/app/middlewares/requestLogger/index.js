const { v4: uuidv4 } = require('uuid')
const { logger, setContext } = require('../../../helpers')

module.exports = app => {
  app.all('*', (req, res, next) => {
    const requestId = req.headers['x-request-id'] || uuidv4()
    setContext({ key: 'requestId', value: requestId.replace(/-/g, '') })

    const { method, path, body, query, params } = req

    logger.info(`[Request starting]`, 'requestLoggerMiddleware', {
      requestId,
      method,
      endpoint: path,
      body: logger.beautify(body),
      query,
      params
    })

    return next()
  })
}
