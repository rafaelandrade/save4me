/**
 * @function
 * @param {Object} data
 * @param {string} data.url
 * @param {URL} data.urlData
 * @returns {string}
 */
const formatImageUrl = ({ url, urlData }) => {
  if (url.includes('http')) return url

  return `${urlData.protocol}//${urlData.host}/${url}`
}

module.exports = formatImageUrl
