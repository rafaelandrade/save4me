const faker = require('faker')
const verifyAccount = require('../../../../src/services/login/verifyAccount')
const keys = require('../../../../src/config/keys')

describe('[verifyAccount] Test case', () => {
  it('Should return error false and email of user', async () => {
    const data = { email: faker.internet.email(), password: 'password' }

    keys.authTokens.adminToken = 'token'

    // @ts-ignore
    const response = await verifyAccount({ user: { id: 1, email: data.email }, email: data.email })

    expect(response).not.toBeUndefined()
    expect(response).toStrictEqual({
      error: false,
      email: data.email,
      token: expect.any(String),
    })
  })
})
