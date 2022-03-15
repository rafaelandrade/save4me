const crypto = require('crypto')
const Sentry = require('@sentry/node')
const keys = require('../../config/keys')

/**
 * @description Will setup Sentry for the application
 * in order to track errors
 * @param {Object} application
 */
const setupSentry = application => {
  const transactionId = crypto
    .randomBytes(36)
    .toString('hex')
    .substr(2, 9)

  Sentry.configureScope(scope => scope.setTag('transaction_id', transactionId))
  Sentry.init({
    dsn: keys.sentryDNS,
    environment: keys.environment
  })

  application.use(Sentry.Handlers.requestHandler())
  application.use(Sentry.Handlers.errorHandler())
}

module.exports = setupSentry
