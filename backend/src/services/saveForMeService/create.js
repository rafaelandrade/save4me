const prisma = require('../../config/prisma')
const logger = require('../logger')
const randomId = require('../../helpers/generateRandomId')

/**
 * @async
 * @function create
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const create = async ({ email, data }) => {
  const response = await prisma.linkContent.create({
    data: { email, data: { id: randomId, link: data.link, keywords: data.keywords } },
  })

  logger.print({ severity: 'info', message: `Created follow link data ${logger.beautify(response)}`, event: 'createService' })

  return response
}

module.exports = create
