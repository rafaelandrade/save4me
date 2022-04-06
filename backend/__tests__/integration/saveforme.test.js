const request = require('supertest')
const { setTestApp } = require('../utils')
const keys = require('../../src/config/keys')

jest.mock('../../src/services/saveForMeService')

describe('saveforme', () => {
  it('Should return status 200 if everything is fine', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    saveForMeService = jest.fn().mockReturnValue({})
    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email: 'test@test.com',
        data: {
          link: 'link',
          keywords: ['keyword'],
          title: 'title',
        },
        service: 'create',
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
  })

  it('Should throw a error in case of not send email', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email: '',
        data: {
          link: 'link',
          keywords: ['keyword'],
          title: 'title',
        },
        service: 'create',
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(400)
  })

  it('Should throw a error in case of not send a service', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email: 'test@test.com',
        data: {
          link: 'link',
          keywords: ['keyword'],
          title: 'title',
        },
        service: '',
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(400)
  })

  it('Should throw a error in case of not send title', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email: 'test@test.com',
        data: {
          link: 'link',
          keywords: ['keyword'],
          title: '',
        },
        service: 'create',
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(400)
  })

  it('Should throw a error in case of not send link', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email: 'test@test.com',
        data: {
          link: '',
          keywords: ['keyword'],
          title: 'title',
        },
        service: 'update',
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(400)
  })
})
