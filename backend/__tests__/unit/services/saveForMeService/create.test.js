const create = require('../../../../src/services/saveForMeService/create')
const prisma = require('../../../../src/config/prisma')
const update = require('../../../../src/services/saveForMeService/update')
const scrapper = require('../../../../src/services/scrapper')

jest.mock('../../../../src/services/saveForMeService/update')
jest.mock('../../../../src/services/scrapper')

describe('[create] Test case', () => {
  it('Should called prisma and should be called with same parameters', async () => {
    const data = { keywords: ['facebook', 'discord', 'medium'], link: 'link', title: 'title' }

    // @ts-ignore
    update.mockImplementation(() => {})
    // @ts-ignore
    scrapper.mockImplementation(() => ({ image: 'image' }))
    prisma.linkContent.create = jest.fn().mockReturnValue('')

    // @ts-ignore
    const response = await create({ email: 'email@teste.com', data })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.create).toBeCalled()
    expect(prisma.linkContent.create).toBeCalledWith({
      data: {
        data: {
          id: expect.any(String),
          link: 'link',
          title: 'title',
          icon: 'image',
          keywords: ['facebook', 'discord', 'medium'],
        },
        email: 'email@teste.com',
      },
    })
  })
})
