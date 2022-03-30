const saveForMeService = require('../../../../src/services/saveForMeService/index')
const prisma = require('../../../../src/config/prisma')

const create = require('../../../../src/services/saveForMeService/create')
const update = require('../../../../src/services/saveForMeService/update')
const remove = require('../../../../src/services/saveForMeService/remove')

jest.mock('../../../../src/services/saveForMeService/create')
jest.mock('../../../../src/services/saveForMeService/update')
jest.mock('../../../../src/services/saveForMeService/remove')

describe('[saveForMeService] Test case', () => {
  beforeAll(() => {
    // @ts-ignore
    create.mockReturnValue({})
    // @ts-ignore
    update.mockReturnValue({})
    // @ts-ignore
    remove.mockReturnValue({})
  });

  it('Should called create function if not find any data in database and service going to be create', async () => {
    prisma.linkContent.findUnique = jest.fn().mockReturnValue(null)

    const response = await saveForMeService({ email: 'test@email.com', data: {}, service: 'create' })

    expect(response).not.toBeUndefined()
    expect(create).toBeCalled()
    expect(update).not.toBeCalled()
    expect(remove).not.toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test@email.com' } })
  })

  it('Should called remove function if find some link in database and remove name is in service', async () => {
    prisma.linkContent.findUnique = jest.fn().mockReturnValue({ link: '' })

    const response = await saveForMeService({ email: 'test2@email.com', data: {}, service: 'remove' })

    expect(response).not.toBeUndefined()
    expect(remove).toBeCalled()
    expect(create).not.toBeCalled()
    expect(update).not.toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test2@email.com' } })
  })

  it('Should called update function if find some link in database and update is in service', async () => {
    prisma.linkContent.findUnique = jest.fn().mockReturnValue({ link: '' })

    const response = await saveForMeService({ email: 'test3@email.com', data: {}, service: 'update' })

    expect(response).not.toBeUndefined()
    expect(remove).not.toBeCalled()
    expect(create).not.toBeCalled()
    expect(update).toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test3@email.com' } })
  })

  it('Should not call create, update and remove just going to return data based on email', async () => {
    prisma.linkContent.findUnique = jest.fn().mockReturnValue({ link: '' })

    const response = await saveForMeService({ email: 'test4@email.com', data: {}, service: 'list' })

    expect(response).not.toBeUndefined()
    expect(remove).not.toBeCalled()
    expect(create).not.toBeCalled()
    expect(update).not.toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test4@email.com' } })
  })
})
