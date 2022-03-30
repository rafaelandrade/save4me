const create = require('../../../../src/services/saveForMeService/create')
const prisma = require('../../../../src/config/prisma')

describe('[create] Test case', () => {
  it('Should called prisma and should be called with same parameters', async () => {
    const data = { keywords: ['facebook', 'discord', 'medium'], link: 'link' }

    prisma.linkContent.create = jest.fn().mockReturnValue('')

    // @ts-ignore
    const response = await create({ email: 'email@teste.com', data })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.create).toBeCalled()
    expect(prisma.linkContent.create).toBeCalledWith({
      data: { data: { id: 1, link: 'link', keywords: ['facebook', 'discord', 'medium'] }, email: 'email@teste.com' },
    })
  })
})
