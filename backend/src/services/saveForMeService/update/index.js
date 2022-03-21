const { BodyPropertyError } = require('errors-stack')
const prisma = require('../../../config/prisma')

const update = ({ email, data, link, inactivate }) => {
  const linkContent = prisma.LinkContent.findUnique({ where: { email } })

  if (!linkContent) throw new BodyPropertyError('Could not find any link content with these email!')

  if (!inactivate) {
    const newObject = { ...linkContent.data, [`${data.principal}`]: { link, keywords: data.words, active: true } }

    return prisma.LinkContent.update({ where: { email }, data: { data: newObject } })
  }
}

module.exports = update
