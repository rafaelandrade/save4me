const faker = require('faker')
const bcrypt = require('bcrypt')
const { saveForMeController } = require('../../../src/controllers')
const { res, req } = require('../../mocks').mockExpress
const errorHandler = require('../../../src/helpers/errorHandler')
const create = require('../../../src/services/login/createAccount')
const verify = require('../../../src/services/login/verifyAccount')
const prisma = require('../../../src/config/prisma')

jest.mock('bcrypt')
jest.mock('../../../src/helpers/errorHandler')
jest.mock('../../../src/services/login/createAccount')
jest.mock('../../../src/services/login/verifyAccount')
jest.mock('../../../src/services/saveForMeService/index')

describe('[loginController] test case', () => {
  it('Should called create function in case of not find any user based on email', async () => {
    const email = faker.internet.email()
    req.body = { email }

    // @ts-ignore
    create.mockReturnValue('')
    // @ts-ignore
    verify.mockReturnValue('')
    prisma.user.findUnique = jest.fn().mockReturnValue(null)

    await saveForMeController.login(req, res)

    expect(prisma.user.findUnique).toBeCalled()
    expect(prisma.user.findUnique).toBeCalledWith({ where: { email } })
    expect(create).toBeCalled()
    expect(verify).not.toBeCalled()
    expect(errorHandler).not.toBeCalled()
  })

  it('Should called verify function in case of find any user based on email', async () => {
    const email = faker.internet.email()
    req.body = { email, password: 'test' }
    bcrypt.compare = jest.fn().mockReturnValue(true)

    // @ts-ignore
    create.mockReturnValue('')
    // @ts-ignore
    verify.mockReturnValue('')
    prisma.user.findUnique = jest.fn().mockReturnValue({ id: 1, email, password: 'test' })

    await saveForMeController.login(req, res)

    expect(prisma.user.findUnique).toBeCalled()
    expect(prisma.user.findUnique).toBeCalledWith({ where: { email } })
    expect(create).not.toBeCalled()
    expect(verify).toBeCalled()
    expect(errorHandler).not.toBeCalled()
  })

  it('Should return status 400 in case of find user but password is different', async () => {
    const email = faker.internet.email()
    req.body = { email, password: 'test1' }

    // @ts-ignore
    create.mockReturnValue('')
    // @ts-ignore
    verify.mockReturnValue('')
    prisma.user.findUnique = jest.fn().mockReturnValue({ id: 1, email, password: 'test' })

    await saveForMeController.login(req, res)

    expect(prisma.user.findUnique).toBeCalled()
    expect(prisma.user.findUnique).toBeCalledWith({ where: { email } })
    expect(create).not.toBeCalled()
    expect(verify).toBeCalled()
    expect(errorHandler).not.toBeCalled()
  })
})
