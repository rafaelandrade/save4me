const faker = require('faker')
const request = require('supertest')
const { setTestApp } = require('../utils')
const keys = require('../../src/config/keys')
const mockMongoose = require('../mocks/mockMongoose')
const { healthService } = require('../../src/app/constants/textConstants')

const { mongoTestConnection, mongoTestCloseConnection } = mockMongoose

jest.mock('../../src/config/keys')

describe('healthController', () => {
  beforeAll(async () => {
    await mongoTestConnection()
  })

  afterAll(async () => {
    await mongoTestCloseConnection()
  })

  it('Should return status 200 if the connection is up', async () => {
    const healthToken = faker.datatype.uuid()
    keys.authTokens.healthToken = healthToken

    const response = await request(setTestApp)
      .get('/v1/health/')
      .set('Authorization', healthToken)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.status).toBe(healthService.apiSuccess)
  })

  it('Should return status 401 for an invalid token', async () => {
    const healthToken = faker.datatype.uuid()
    keys.authTokens.healthToken = healthToken

    const response = await request(setTestApp)
      .get('/v1/health/')
      .set('Authorization', faker.datatype.uuid())

    expect(response.status).toBe(401)
  })
})
