const prisma = require('../../config/prisma')

/**
 * @async
 * @function create
 * @param {String} email
 * @param {Object} data
 * @returns {Promise<>}
 */
const create = async ({ email, data }) => {
  const userLinkContent = data.map((value) => ({
    [`${value.data.principal}`]: { link: value.data.link, keywords: value.data.words, active: true },
  }))

  // @ts-ignore
  return prisma.linkContent.create({ email, data: Object.assign({}, ...userLinkContent) })
}

module.exports = create
