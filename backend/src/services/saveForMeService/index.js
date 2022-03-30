const create = require('./create')
const update = require('./update')
const remove = require('./remove')

const prisma = require('../../config/prisma')

const { saveForMeConstants } = require('../../constants')

/**
 * @async
 * @function saveForMeService
 * @param {object} data - Service object
 * @param {String} data.email
 * @param {Object} data.data
 * @param {String} data.service
 * @returns {Promise<import('@prisma/client').LinkContent>}
 */
const saveForMeService = async ({ email, data, service }) => {
  const linkContent = await prisma.linkContent.findUnique({ where: { email } })

  if (!linkContent && service === saveForMeConstants.create) return create({ email, data })

  if (linkContent && service === saveForMeConstants.remove) return remove({ email, data, linkContent })

  if (linkContent && service === saveForMeConstants.update) return update({ email, data, linkContent })

  return linkContent
}

module.exports = saveForMeService
