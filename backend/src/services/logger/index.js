const Coralogix = require('coralogix-logger')
const keys = require('../../config/keys')

const config = new Coralogix.LoggerConfig({
  applicationName: keys.coralogix.applicationName,
  privateKey: keys.coralogix.privateKey,
  subsystemName: keys.coralogix.subsystemName,
})

Coralogix.CoralogixLogger.configure(config)

class Logger {
  #logger

  #format

  constructor() {
    this.#logger = new Coralogix.CoralogixLogger('Logger')

    /**
     * @function
     * @param {Object} arg
     * @returns {String}
     */
    this.beautify = (arg) => JSON.stringify(arg, undefined, 2)

    /**
     * @function
     * @param {{event: string, message:string}}  data
     * @returns {{timestamp: string, data: string, event:string}}
     */
    this.#format = ({ event, message }) => ({
      timestamp: new Date().toISOString(),
      data: message,
      event,
    })
  }

  /**
   * @function
   * @param {{event: string, message:string}} data
   * @param {'debug' | 'verbose' | 'info' | 'warning' | 'error' | 'critical'} severity
   * @returns {Void}
   */
  #addLog(data, severity) {
    const log = new Coralogix.Log({
      severity: Coralogix.Severity[severity],
      className: 'Logger',
      methodName: 'Logger',
      text: this.#format(data),
    })

    this.#logger.addLog(log)
  }

  /**
   * @function
   * @param {{event: string, message:string}}  arg
   * @returns {Void}
   */
  warn(arg) {
    this.#addLog(arg, 'warning')

    return console.warn(this.#format(arg))
  }

  /**
   * @function
   * @param {{event: string, message:string}}  arg
   * @returns {Void}
   */
  error(arg) {
    this.#addLog(arg, 'error')

    return console.error(this.#format(arg))
  }

  /**
   * @function
   * @param {{event: string, message:string}}  arg
   * @returns {Void}
   */
  info(arg) {
    this.#addLog(arg, 'info')

    return console.info(this.#format(arg))
  }

  /**
   * @function
   * @param {{event: string, message:string}}  arg
   * @returns {Void}
   */
  debug(arg) {
    this.#addLog(arg, 'debug')

    return console.debug(this.#format(arg))
  }
}

module.exports = new Logger()
