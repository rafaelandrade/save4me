const remove = require('../../../../src/services/saveForMeService/remove')
const prisma = require('../../../../src/config/prisma')

jest.mock('../../../../src/helpers/generateRandomId', () => 1)

describe('[remove] Test case', () => {
  it('Should delete link with id equal to 3 and just going to update data with id 4', async () => {
    const data = { id: 3, keywords: ['facebook', 'discord', 'medium'], link: 'link' }

    prisma.linkContent.update = jest.fn().mockReturnValue('')
    const response = await remove({
      email: 'email@teste.com',
      data,
      linkContent: {
        data: [
          { id: 3, link: 'link', keywords: ['facebook', 'discord', 'medium'] },
          { id: 4, link: 'link', keywords: ['facebook'] },
        ],
      },
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalled()
    expect(prisma.linkContent.update).toBeCalledWith({ where: { email: 'email@teste.com' },
      data: { data: [
        { id: 4, link: 'link', keywords: ['facebook'] },
      ] } })
  })

  it('Should delete any data in case of send object that user dont have saved', async () => {
    const data = { id: 15, keywords: ['facebook', 'discord', 'medium'], link: 'link' }

    prisma.linkContent.update = jest.fn().mockReturnValue('')
    const response = await remove({
      email: 'email@teste.com',
      data,
      linkContent: {
        data: [
          { id: 3, link: 'link', keywords: ['facebook', 'discord', 'medium'] },
          { id: 4, link: 'link', keywords: ['facebook'] },
        ],
      },
    })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.update).toBeCalled()
    expect(prisma.linkContent.update).toBeCalledWith({ where: { email: 'email@teste.com' },
      data: { data: [
        { id: 3, link: 'link', keywords: ['facebook', 'discord', 'medium'] },
        { id: 4, link: 'link', keywords: ['facebook'] },
      ] } })
  })
})
