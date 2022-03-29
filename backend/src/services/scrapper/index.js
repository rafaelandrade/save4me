const axios = require('axios').default
const cheerio = require('cheerio')

/**
 * @async
 * @function
 * @param {string} site
 * @returns {Promise<{title?:string, description?:string, image?:string}>}
 */
const scrapper = async (site) => {
  const { data } = await axios.get(site)

  const $ = cheerio.load(data)

  const title = $('title').text()
  const description = $('meta[name="description"]').attr('content')
  const image = $('meta[property="og:image"]').attr('content')

  return {
    title,
    description,
    image,
  }
}

module.exports = scrapper
