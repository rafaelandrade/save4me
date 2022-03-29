const create = require('./create')
const update = require('./update')

const logger = require('../logger')
const prisma = require('../../config/prisma')

const saveForMeService = async ({ email, data, inactivate = false }) => {
  const getLinkContent = await prisma.linkContent.findUnique({ where: { email } })

  logger.print({ severity: 'info', message: '' })
  if (!getLinkContent) return create({ email, data })

  return update({ email, data, inactivate })
}

module.exports = saveForMeService
