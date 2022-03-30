const update = require('../../../../src/services/saveForMeService/update')
const prisma = require('../../../../src/config/prisma')

jest.mock('../../../../src/helpers/generateRandomId', () => 9)

describe('[update] Test case', () => {
  it('Should throw a error in case of not find any data in database', async () => {
    try {
      await update({ email: 'test@email.com', data: {}, linkContent: null })
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error.name).toBe('BodyPropertyError')
      expect(error.message).toBe('Could not find any link content with these email!')
    }
  })

  it('Should called prisma update in case to inactive some link data and inactive should be false', async () => {
    const mockData = {
      data: [
        { id: 1, link: 'link-one', keywords: ['facebook', 'discord', 'medium'] },
        { id: 2, link: 'link-two', keywords: ['medium', 'tutorial', 'test'] },
        { id: 3, link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'] },
      ],
    }
    prisma.linkContent.update = jest.fn().mockReturnValue({})

    const response = await update({
      email: 'test@prisma.com',
      data: { keywords: ['food', 'fork'], link: 'link' },
      linkContent: mockData,
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalledWith({
      where: { email: 'test@prisma.com' },
      data: {
        data: [
          { id: 1, link: 'link-one', keywords: ['facebook', 'discord', 'medium'] },
          { id: 2, link: 'link-two', keywords: ['medium', 'tutorial', 'test'] },
          { id: 3, link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'] },
          { id: 9, link: 'link', keywords: ['food', 'fork'] },
        ],
      },
    })
  })

  it('Should delete an object of link and going to update without it', async () => {
    const mockData = {
      data: [
        { id: 1, link: 'link-one', keywords: ['facebook', 'discord', 'medium'] },
        { id: 2, link: 'link-two', keywords: ['medium', 'tutorial', 'test'] },
        { id: 3, link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'] },
        { id: 4, link: 'link-four', keywords: ['scraper', 'aws', 'ec2'] },
        { id: 5, link: 'link-five', keywords: ['scraper', 'aws', 'ec2'] },
      ],
    }
    prisma.linkContent.update = jest.fn().mockReturnValue({})

    const response = await update({
      email: 'test@prisma.com',
      data: { keywords: ['food', 'fork'], link: 'link-final' },
      linkContent: mockData,
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalledWith({
      where: { email: 'test@prisma.com' },
      data: {
        data: [
          { id: 1, link: 'link-one', keywords: ['facebook', 'discord', 'medium'] },
          { id: 2, link: 'link-two', keywords: ['medium', 'tutorial', 'test'] },
          { id: 3, link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'] },
          { id: 4, link: 'link-four', keywords: ['scraper', 'aws', 'ec2'] },
          { id: 5, link: 'link-five', keywords: ['scraper', 'aws', 'ec2'] },
          { id: 9, link: 'link-final', keywords: ['food', 'fork'] },
        ],
      },
    })
  })
})
