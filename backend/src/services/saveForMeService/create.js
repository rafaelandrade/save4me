const prisma = require('../../config/prisma')

/**
 * @async
 * @function create
 * @param {string} email The Email of user
 * @param {object=} data Object with keywords and email and the link url
 * @param {string} data.principal Principal keyword used to identify the link url
 * @param {words} data.words Others words used to identify the link url
 * @param {string} linkUrl Link of website that is going to be saved
 * @returns {Promise<>}
 */
const create = async ({ email, data, linkUrl }) => {
  const [userLinkContent] = data.map((value) => ({
    [`${value.data.principal}`]: { link: linkUrl, keywords: value.data.words, active: true },
  }))

  return prisma.LinkContent.create({ email, data: userLinkContent })
}

module.exports = create
