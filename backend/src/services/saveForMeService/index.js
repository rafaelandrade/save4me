const create = require('./create')
const update = require('./update')

const logger = require('../logger')
const prisma = require('../../config/prisma')

const saveForMeService = async ({ email, data, link, inactivate = false }) => {
  const getLinkContent = await prisma.LinkContent.findUnique({ where: { email } })

  logger.print({ severity: 'info', message: '' })
  if (!getLinkContent) return create({ email, data, link })

  return update({ email, data, link, inactivate })
}

module.exports = saveForMeService
