const saveForMeService = require('../../../../src/services/saveForMeService/index')
const prisma = require('../../../../src/config/prisma')

const create = require('../../../../src/services/saveForMeService/create')
const update = require('../../../../src/services/saveForMeService/update')

jest.mock('../../../../src/services/saveForMeService/create')
jest.mock('../../../../src/services/saveForMeService/update')

describe('[saveForMeService] Test case', () => {
  it('Should called create function if not find any data in database', async () => {
    create.mockReturnValue({})
    update.mockReturnValue({})

    prisma.linkContent.findUnique = jest.fn().mockReturnValue(null)

    const response = await saveForMeService({ email: 'test@email.com', data: {}, link: '', inactivate: true })

    expect(response).not.toBeUndefined()
    expect(create).toBeCalled()
    expect(update).not.toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test@email.com' } })
  })

  it('Should called update function if find some link in database', async () => {
    create.mockReturnValue({})
    update.mockReturnValue({})

    prisma.linkContent.findUnique = jest.fn().mockReturnValue({ link: '' })

    const response = await saveForMeService({ email: 'test2@email.com', data: {}, link: '', inactivate: false })

    expect(response).not.toBeUndefined()
    expect(create).not.toBeCalled()
    expect(update).toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email: 'test2@email.com' } })
  })
})
