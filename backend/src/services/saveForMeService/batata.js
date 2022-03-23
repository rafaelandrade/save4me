const prisma = require('../../config/prisma')

const batata = async () => prisma.linkContent.create({ data: { email: 'rafs', data: {} } })

module.exports = batata
