const prisma = require('../../config/prisma')
const logger = require('../logger')

/**
 * @async
 * @function remove
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @param {import('@prisma/client').LinkContent} data.linkContent
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const remove = async ({ email, data, linkContent }) => {
  // @ts-ignore
  const newLinks = linkContent.data.filter((value) => value.id !== data.id)

  logger.print({
    severity: 'info',
    message: `Deleted linkContent and going to save new object ${logger.beautify(newLinks)}`,
    event: 'removeService',
  })

  return prisma.linkContent.update({ where: { email }, data: { data: newLinks } })
}

module.exports = remove
