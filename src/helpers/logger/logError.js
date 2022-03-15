const Sentry = require('@sentry/node')

/**
 * @description Log sentry error
 * @param {*} data
 */
const logError = data => {
  console.error(data)
  Sentry.addBreadcrumb({
    category: data.constructor.name,
    message: data.message,
    level: Sentry.Severity.Error,
    data
  })
}

module.exports = logError
