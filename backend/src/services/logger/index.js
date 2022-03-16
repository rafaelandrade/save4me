module.exports = {
  /**
   * @function
   * @param {Object} arg
   * @returns {Void}
   */
  warn: (arg) => console.warn(arg),

  /**
   * @function
   * @param {Object} arg
   * @returns {Void}
   */
  error: (arg) => console.error(arg),

  /**
   * @function
   * @param {Object} arg
   * @returns {Void}
   */
  info: (arg) => console.info(arg),

  /**
   * @function
   * @param {Object} arg
   * @returns {Void}
   */
  debug: (arg) => console.debug(arg),

  /**
   * @function
   * @param {Object} arg
   * @returns {String}
   */
  beautify: (arg) => JSON.stringify(arg, undefined, 2),
}
