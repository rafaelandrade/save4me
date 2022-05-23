const faker = require('faker')
const createAccount = require('../../../../src/services/login/createAccount')
const prisma = require('../../../../src/config/prisma')
const keys = require('../../../../src/config/keys')

describe('[createAccount] Test case', () => {
  it('Should called user.create', async () => {
    const data = { email: faker.internet.email(), password: 'password' }

    keys.authTokens.adminToken = 'token'
    prisma.user.create = jest.fn().mockReturnValue({ email: data.email })

    // @ts-ignore
    const response = await createAccount({ email: data.email, password: data.password })

    expect(response).not.toBeUndefined()
    expect(prisma.user.create).toBeCalled()
    expect(prisma.user.create).toBeCalledWith({
      data: {
        email: data.email,
        password: expect.any(String),
      },
    })
    expect(response.error).toBeFalsy()
    expect(response.email).toBe(data.email)
  })
})
