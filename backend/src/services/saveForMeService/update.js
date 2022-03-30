/* eslint-disable no-param-reassign */
const { BodyPropertyError } = require('errors-stack')
const crypto = require('crypto')
const prisma = require('../../config/prisma')
const logger = require('../logger')

const scrapper = require('../scrapper')

/**
 * @async
 * @function update
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @param {{data:Array}} data.linkContent
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const update = async ({ email, data, linkContent }) => {
  const { link, keywords, title } = data
  const { image } = await scrapper(link)

  if (!linkContent) throw new BodyPropertyError('Could not find any link content with these email!')

  const linkIndex = linkContent.data.findIndex(({ id }) => id === data.id)

  if (data.id && linkIndex > -1) {
    linkContent.data[linkIndex] = { ...linkContent.data[linkIndex], ...data }
  } else {
    linkContent.data.push({ id: crypto.randomUUID(), link, keywords, title, icon: image })
  }

  logger.print({ severity: 'info', message: `New object data ${logger.beautify(linkContent.data)}`, event: 'updateService' })

  return prisma.linkContent.update({ where: { email }, data: { data: linkContent.data } })
}

module.exports = update
