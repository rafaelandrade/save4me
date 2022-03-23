const batata = require('../../../src/services/saveForMeService/batata')

jest.mock('../../../src/config/prisma', () => ({
  linkContent: {
    create: jest.fn().mockReturnValue({ id: '' }),
  },
}))

describe('[logger] Test case', () => {
  it('Should log all severity and beautify', async () => {
    const response = await batata()
    expect(response).toStrictEqual({ id: '' })
  })
})
