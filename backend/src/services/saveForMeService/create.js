const prisma = require('../../config/prisma')

/**
 * @async
 * @function create
 * @param {String} email The Email of user
 * @param {object} data Object with keywords and email and the link url
 * @param {String} linkUrl Link of website that is going to be saved
 * @returns {Promise<>}
 */
const create = async ({ email, data, linkUrl }) => {
  const [userLinkContent] = data.map((value) => ({
    [`${value.data.principal}`]: { link: linkUrl, keywords: value.data.words, active: true },
  }))

  return prisma.linkContent.create({ email, data: userLinkContent })
}

module.exports = create
