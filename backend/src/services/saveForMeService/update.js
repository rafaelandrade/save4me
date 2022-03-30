const { BodyPropertyError } = require('errors-stack')
const prisma = require('../../config/prisma')
const logger = require('../logger')

const randomId = require('../../helpers/generateRandomId')

/**
 * @async
 * @function update
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @param {import('@prisma/client').LinkContent} data.linkContent
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const update = async ({ email, data, linkContent }) => {
  if (!linkContent) throw new BodyPropertyError('Could not find any link content with these email!')

  linkContent.data.push({ id: randomId, link: data.link, keywords: data.keywords })

  logger.print({ severity: 'info', message: `New object data ${logger.beautify(linkContent.data)}`, event: 'updateService' })

  return prisma.linkContent.update({ where: { email }, data: { data: linkContent.data } })
}

module.exports = update
