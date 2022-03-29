const { BodyPropertyError } = require('errors-stack')
const prisma = require('../../config/prisma')

/**
 * @async
 * @function update
 * @param {String} email
 * @param {Object} data
 * @param {boolean} inactivate
 * @returns {Promise<>}
 */
const update = async ({ email, data, inactivate }) => {
  const linkContent = await prisma.linkContent.findUnique({ where: { email } })

  if (!linkContent) throw new BodyPropertyError('Could not find any link content with these email!')

  if (!inactivate) {
    // @ts-ignore
    const newObject = { ...linkContent.data, [`${data.principal}`]: { link: data.link, keywords: data.words, active: true } }

    return prisma.linkContent.update({ where: { email }, data: { data: newObject } })
  }

  delete linkContent.data[`${data.principal}`]

  return prisma.linkContent.update({ where: { email }, data: { data: linkContent.data } })
}

module.exports = update
