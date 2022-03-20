const { errorHandler } = require('../../helpers')

/**
 * @function
 * @param {*} _req
 * @param {*} res
 * @return {Promise<void>}
 */
const healthController = (_req, res) => {
  try {
    return res.status(200).json({ error: false, message: 'OK!' })
  } catch (error) {
    return errorHandler({ res, error })
  }
}

module.exports = healthController
