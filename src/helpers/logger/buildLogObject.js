const { isObject } = require('lodash')

/**
 * @description Will format the log object according to the error nature
 * @param {Object} data
 * @param {Object} data.arg
 * @param {Boolean} data.isError
 * @param {String} data.requestId
 * @param {String=} [data.event=null]
 * @param {Object=} [data.eventObject={}]
 * @return {Object}
 */
const buildLogObject = ({ arg, isError, requestId, event = null, eventObject = {} }) => {
  return {
    x_request_id: requestId,
    event,
    context: {
      ...(isObject(eventObject) ? eventObject : {}),
      ...(isError
        ? {
            name: arg.name,
            message: arg.message,
            ...(arg.body ? { body: arg.body } : {}),
            ...(arg.validations ? { validations: arg.validations } : {}),
            stack: arg.stack
          }
        : { message: arg })
    }
  }
}

module.exports = buildLogObject
