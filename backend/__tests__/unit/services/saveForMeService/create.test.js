const create = require('../../../../src/services/saveForMeService/create')
const prisma = require('../../../../src/config/prisma')

describe('[create] Test case', () => {
  it('Should called prisma and should be called with same parameters', async () => {
    const data = [{ data: { principal: 'Internet', words: ['facebook', 'discord', 'medium'], link: 'link' } }]

    prisma.linkContent.create = jest.fn().mockReturnValue('')
    const response = await create({ email: 'email@teste.com', data })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.create).toBeCalled()
    expect(prisma.linkContent.create).toBeCalledWith({
      email: 'email@teste.com',
      data: { Internet: { link: 'link', keywords: ['facebook', 'discord', 'medium'], active: true } },
    })
  })

  it('Should called prisma and should be called with same parameters', async () => {
    const data = [
      { data: { principal: 'Internet', words: ['facebook', 'discord', 'medium'], link: 'link-one' } },
      { data: { principal: 'Ruby', words: ['medium', 'tutorial', 'test'], link: 'link-two' } },
      { data: { principal: 'Python', words: ['scraper', 'aws', 'ec2'], link: 'link-tree' } },
    ]

    prisma.linkContent.create = jest.fn().mockReturnValue('')
    const response = await create({ email: 'email@teste.com', data })

    expect(response).not.toBeUndefined()
    expect(prisma.linkContent.create).toBeCalled()
    expect(prisma.linkContent.create).toBeCalledWith({
      email: 'email@teste.com',
      data: {
        Internet: { link: 'link-one', keywords: ['facebook', 'discord', 'medium'], active: true },
        Ruby: { link: 'link-two', keywords: ['medium', 'tutorial', 'test'], active: true },
        Python: { link: 'link-tree', keywords: ['scraper', 'aws', 'ec2'], active: true },
      },
    })
  })
})
