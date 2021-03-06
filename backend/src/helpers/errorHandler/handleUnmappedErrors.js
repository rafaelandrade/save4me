const { InternalServiceError } = require('errors-stack')

/**
 * @description Will handle unmapped errors logging the sentry
 * captured exception
 * @param {Object} data
 * @param {Object} data.res
 * @param {Object} data.capturedException
 */
const handleUnmappedErrors = ({ res, capturedException }) => {
  const internalServiceError = new InternalServiceError(
    `This is a internal server error, sentry captured exception with id ${capturedException}`
  )

  return res
    .status(500)
    .json({ error: true, errors: [{ name: internalServiceError.name, message: internalServiceError.message }] })
}

module.exports = handleUnmappedErrors
