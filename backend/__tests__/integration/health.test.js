const request = require('supertest')
const { setTestApp } = require('../utils')
const keys = require('../../src/config/keys')

describe('healthController', () => {
  it('Should return status 200 if the connection is up', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const response = await request(setTestApp).get('/v1/health/').set('Authorization', adminToken)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
    expect(response.body.message).toBe('OK!')
  })
})
