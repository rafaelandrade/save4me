const scrapper = require('../../../src/services/scrapper')

describe('[scrapper] Test case', () => {
  it('Should return metadata of the website passed', async () => {
    const site = 'https://www.npmjs.com/package/cheerio'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description: expect.any(String),
      image: 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
      title: 'cheerio - npmGitDownloads',
    })
  })
})
