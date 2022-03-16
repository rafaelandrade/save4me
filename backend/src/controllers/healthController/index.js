const { errorHandler } = require('../../helpers')

/**
 * @param {*} res
 * @return {Promise<apiResponse>}
 */
module.exports = async (req, res) => {
  try {
    return res.status(200).json({ error: false, message: 'OK!' })
  } catch (error) {
    return errorHandler({ res, error })
  }
}
