const httpContext = require('express-http-context')

/**
 * @description Will set a property at the http context
 * @param {Object} data
 * @param {String} data.key
 * @param {Object} data.value
 * @return {void}
 */

const setContext = ({ key, value }) => {
  return httpContext.set(key, value)
}

module.exports = setContext
