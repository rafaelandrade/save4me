const scrapper = require('../../../src/services/scrapper')

describe('[scrapper] Test case', () => {
  it('Should return metadata of the website passed', async () => {
    const site = 'https://www.npmjs.com/package/cheerio'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description:
        'Tiny, fast, and elegant implementation of core jQuery designed specifically for the server. Latest version: 1.0.0-rc.10, last published: 9 months ago. Start using cheerio in your project by running `npm i cheerio`. There are 13420 other projects in the npm registry using cheerio.',
      image: 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
      title: 'cheerio - npmGitDownloads',
    })
  })
})
