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

  const obj = {
    [saveForMeConstants.create]: create,
    [saveForMeConstants.update]: update,
    [saveForMeConstants.remove]: remove,
  }
  if (obj[service]) {
    return obj[service]({ email, data, linkContent })
  }

  return linkContent
}

module.exports = saveForMeService
