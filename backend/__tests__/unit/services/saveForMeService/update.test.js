const update = require('../../../../src/services/saveForMeService/update')
const prisma = require('../../../../src/config/prisma')

describe('[update] Test case', () => {
  it('Should throw a error in case of not find any data in database', async () => {
    try {
      prisma.linkContent.findUnique = jest.fn().mockReturnValue(null)
      await update({ email: 'test@email.com', data: {}, inactivate: true })
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error.name).toBe('BodyPropertyError')
      expect(error.message).toBe('Could not find any link content with these email!')
    }
  })

  it('Should called prisma update in case to inactive some link data and inactive should be false', async () => {
    const mockData = {
      data: {
        Internet: { link: 'link-one', keywords: ['facebook', 'discord', 'medium'], active: true },
        Ruby: { link: 'link-two', keywords: ['medium', 'tutorial', 'test'], active: true },
        Python: { link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'], active: true },
      },
    }
    prisma.linkContent.findUnique = jest.fn().mockReturnValue(mockData)
    prisma.linkContent.update = jest.fn().mockReturnValue({})

    const response = await update({
      email: 'test@prisma.com',
      data: { principal: 'Potatoes', words: ['food', 'fork'], link: 'link' },
      inactivate: false,
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalledWith({ where: { email: 'test@prisma.com' },
      data: { data: {
        Internet: { link: 'link-one', keywords: ['facebook', 'discord', 'medium'], active: true },
        Ruby: { link: 'link-two', keywords: ['medium', 'tutorial', 'test'], active: true },
        Python: { link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'], active: true },
        Potatoes: { link: 'link', keywords: ['food', 'fork'], active: true },
      } } })
  })

  it('Should delete an object of link and going to update without it', async () => {
    const mockData = {
      data: {
        Internet: { link: 'link-one', keywords: ['facebook', 'discord', 'medium'], active: true },
        Ruby: { link: 'link-two', keywords: ['medium', 'tutorial', 'test'], active: true },
        Python: { link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'], active: true },
        Potatoes: { link: 'link', keywords: ['food', 'fork'], active: true },
      },
    }
    prisma.linkContent.findUnique = jest.fn().mockReturnValue(mockData)
    prisma.linkContent.update = jest.fn().mockReturnValue({})

    const response = await update({
      email: 'test@prisma.com',
      data: { principal: 'Potatoes', words: ['food', 'fork'], link: 'link' },
      inactivate: true,
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalledWith({ where: { email: 'test@prisma.com' },
      data: { data: {
        Internet: { link: 'link-one', keywords: ['facebook', 'discord', 'medium'], active: true },
        Ruby: { link: 'link-two', keywords: ['medium', 'tutorial', 'test'], active: true },
        Python: { link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'], active: true },
      } } })
  })
})
