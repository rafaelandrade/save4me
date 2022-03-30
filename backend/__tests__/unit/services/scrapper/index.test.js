const scrapper = require('../../../../src/services/scrapper')

describe('[scrapper] Test case', () => {
  it('Should return metadata of the website passed', async () => {
    const site = 'https://www.npmjs.com/package/cheerio'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description: expect.any(String),
      image: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      title: 'cheerio - npmGitDownloads',
    })
  })

  it('Should return metadata of the website passed and site does not contain five icon', async () => {
    const site = 'https://google.com'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description: expect.any(String),
      image: 'https://google.com//images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png',
      title: 'Google',
    })
  })

  it('Should return metadata of the github website', async () => {
    const site = 'https://github.com'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description: expect.any(String),
      image: 'https://github.com/fluidicon.png',
      title: 'GitHub: Where the world builds software · GitHub',
    })
  })

  it('Should return empty metadata if does not has link or link is invalid', async () => {
    const site = 'http'

    const metadata = await scrapper(site)

    expect(metadata).toEqual({
      description: '',
      image: 'https://avatars.dicebear.com/api/initials/http.svg',
      title: '',
    })
  })
})
