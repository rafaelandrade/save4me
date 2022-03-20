const Coralogix = require('coralogix-logger')
const keys = require('../../config/keys')

const config = new Coralogix.LoggerConfig({
  applicationName: 'save4me/backend',
  privateKey: keys.coralogix.privateKey,
  subsystemName: keys.environment,
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
   * @param {{ event: string, message:string, severity: 'debug' | 'verbose' | 'info' | 'warning' | 'error' | 'critical' }}  arg
   * @returns {Void}
   */
  print({ severity, ...arg }) {
    this.#addLog(arg, severity)

    if (severity === 'warning') return console.warn(this.#format(arg))

    return console[severity](this.#format(arg))
  }
}

module.exports = new Logger()
