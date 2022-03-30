const axios = require('axios').default
const cheerio = require('cheerio')
const formatImageUrl = require('./formatImageUrl')

/**
 * @async
 * @function
 * @param {string} site
 * @returns {Promise<{title?:string, description?:string, image?:string}>}
 */
const scrapper = async (site) => {
  const { data } = await axios.get(site)

  const urlData = new URL(site)

  const $ = cheerio.load(data)

  const title = $('title').text()
  const description = $('meta[name="description"]').attr('content')

  const icons = []

  $('link').map((_index, link) => {
    const linkHref = $(link).attr('href')

    if (linkHref?.includes('icon')) {
      return icons.push(formatImageUrl({ url: linkHref, urlData }))
    }

    return null
  })
  const firstImage = formatImageUrl({ url: $('img').first().attr('src'), urlData })
  const dicebearIcon = `https://avatars.dicebear.com/api/initials/${site}.svg`

  const image = icons[0] || firstImage || dicebearIcon

  return {
    title,
    description,
    image,
  }
}

module.exports = scrapper
