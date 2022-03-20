const Sentry = require('@sentry/node')
const logger = require('../../services/logger')
const handleUnmappedErrors = require('./handleUnmappedErrors')

/**
 * @description Handle error logging around the application
 * @async
 * @function
 * @name errorHandler
 * @param {Object} data
 * @param {Object} data.error Error instance
 * @param {Object=} data.res
 */
const errorHandler = ({ res, error }) => {
  const { message, status } = error

  logger.print({ severity: 'error', event: 'errorHandler', message: error })
  const capturedException = Sentry.captureException(error)

  if (!res) return
  if (!status) return handleUnmappedErrors({ capturedException, res })

  return res.status(status).json({ error: true, errors: [{ name: error.name || 'Error', message }] })
}

module.exports = errorHandler
