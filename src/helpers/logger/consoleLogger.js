const { LoggerConfig, CoralogixLogger, Log, Severity } = require('coralogix-logger')
const Sentry = require('@sentry/node')
const keys = require('../../config/keys')
const buildLogObject = require('./buildLogObject')
const logError = require('./logError')
const getContext = require('../getContext')

CoralogixLogger.configure(
  new LoggerConfig({
    applicationName: '<name of your application>',
    privateKey: keys.coralogixKey,
    subsystemName: '<squad-name>' // Add the name of your squad
  })
)
const logger = new CoralogixLogger('Logger')

/**
 * @description Use console and sends logs to Coralogix. Used to improve dev experience and debugging time.
 * @name consoleLogger
 * @param {any} severity
 * @param {any} arg
 * @param {Object} eventObject
 * @param {string} event
 * @returns {void}
 */
const consoleLogger = (severity, arg, event, eventObject) => {
  const requestId = getContext('requestId')
  requestId && Sentry.setTag('x_request_id', requestId)
  eventObject && Sentry.setUser(eventObject)

  const isError = severity === Severity.error
  const data = buildLogObject({ isError, arg, requestId, event, eventObject })

  logger.addLog(
    new Log({
      severity,
      className: 'ConsoleLogger',
      methodName: 'logger',
      text: data
    })
  )

  if (isError) return logError(data)
  console.log(data)
}

module.exports = consoleLogger
