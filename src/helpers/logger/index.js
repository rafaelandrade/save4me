const { Severity } = require('coralogix-logger')
const consoleLogger = require('./consoleLogger')

module.exports = {
  /**
   * @description Warning log.
   * @param {any} arg - the warn to be logged
   * @param {String} event - the event where the log was executed
   * @param {Object=} [eventObject={}] - Event information object
   * @returns {void}
   */
  warn: (arg, event, eventObject = {}) => consoleLogger(Severity.warning, arg, event, eventObject),
  /**
   * @description Error log.
   * @param {any} arg - the error to be logged
   * @param {String} [event=null] - the event where the log was executed
   * @param {Object=} [eventObject={}] - Event information object
   * @returns {void}
   */
  error: (arg, event, eventObject = {}) => consoleLogger(Severity.error, arg, event, eventObject),
  /**
   * @description Info log.
   * @param {any} arg - the information to be logged
   * @param {String} event - the event where the log was executed
   * @param {Object=} [eventObject={}] - Event information object
   * @returns {void}
   */
  info: (arg, event, eventObject = {}) => consoleLogger(Severity.info, arg, event, eventObject),
  /**
   * @description beautify log
   * @param {any} arg
   * @returns {string}
   */
  beautify: arg => JSON.stringify(arg, undefined, 2)
}
