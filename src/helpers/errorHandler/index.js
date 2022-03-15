const Sentry = require('@sentry/node')
const { ValidationError } = require('errors-stack')
const logger = require('../logger')
const handleUnmappedErrors = require('./handleUnmappedErrors')
const handleValidationErrorObject = require('./handleValidationErrorObject')

/**
 * @description Handle error logging around the application
 * @async
 * @function
 * @name errorHandler
 * @param {Object} data
 * @param {Object} data.error Error instance
 * @param {Object=} data.res
 * @param {String=} [data.event=null]
 */
const errorHandler = ({ res, error, event = null }) => {
  const { message, status } = error

  logger.error(error, event)
  const capturedException = Sentry.captureException(error)

  if (!res) return
  if (error instanceof ValidationError) return handleValidationErrorObject({ res, error })
  if (!status) return handleUnmappedErrors({ capturedException, res })

  return res.status(status).json({ error: true, errors: [{ name: error.name || 'Error', message }] })
}

module.exports = errorHandler
