const faker = require('faker')
const { saveForMeController } = require('../../../src/controllers')
const { res, req } = require('../../mocks').mockExpress
const errorHandler = require('../../../src/helpers/errorHandler')
const prisma = require('../../../src/config/prisma')

jest.mock('../../../src/helpers/errorHandler')
jest.mock('../../../src/services/saveForMeService/index')

describe('[loginController] test case', () => {
  it('Should return login true in case of find email on database', async () => {
    const email = faker.internet.email()
    req.body = { email }

    prisma.linkContent.findUnique = jest.fn().mockReturnValue({ id: 1, email })

    const response = await saveForMeController.login(req, res)

    expect(response.json).toBeCalledWith({ error: false, login: true })
    expect(prisma.linkContent.findUnique).toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email } })
    expect(errorHandler).not.toBeCalled()
  })

  it('Should return login false in case of not find any data in database', async () => {
    const email = faker.internet.email()
    req.body = { email }

    prisma.linkContent.findUnique = jest.fn().mockReturnValue(null)

    const response = await saveForMeController.login(req, res)

    expect(response.json).toBeCalledWith({ error: false, login: false })
    expect(prisma.linkContent.findUnique).toBeCalled()
    expect(prisma.linkContent.findUnique).toBeCalledWith({ where: { email } })
    expect(errorHandler).not.toBeCalled()
  })
})
