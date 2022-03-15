const httpContext = require('express-http-context')

/**
 * @description Will get an property from the http context based on the key used
 * @return {String}
 */

const getContext = key => {
  return httpContext.get(key)
}

module.exports = getContext
