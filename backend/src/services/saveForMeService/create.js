const crypto = require('crypto')
const prisma = require('../../config/prisma')
const logger = require('../logger')
const scrapper = require('../scrapper')
const update = require('./update')

/**
 * @async
 * @function create
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @param {Object} data.linkContent
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const create = async ({ email, data, linkContent }) => {
  if (linkContent) return update({ email, data, linkContent })

  const { link, keywords, title } = data
  const { image } = await scrapper(link)

  const response = await prisma.linkContent.create({
    data: { email, data: { id: crypto.randomUUID(), link, title, keywords, icon: image } },
  })

  logger.print({ severity: 'info', message: `Created follow link data ${logger.beautify(response)}`, event: 'createService' })

  return response
}

module.exports = create
