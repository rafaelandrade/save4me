const request = require('supertest')
const faker = require('faker')
const bcrypt = require('bcrypt')
const { setTestApp } = require('../utils')
const keys = require('../../src/config/keys')
const prisma = require('../../src/config/prisma')
const create = require('../../src/services/login/createAccount')
const verify = require('../../src/services/login/verifyAccount')

jest.mock('bcrypt')
jest.mock('../../src/services/saveForMeService')
jest.mock('../../src/services/login/verifyAccount')
jest.mock('../../src/services/login/createAccount')

describe('saveforme', () => {
  it('Should return status 200 if everything is fine', async () => {
    const adminToken = 'admin'
    const email = faker.internet.email()
    keys.authTokens.adminToken = adminToken

    const response = await request(setTestApp)
      .post('/v1/saveforme')
      .send({
        email,
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

  it('Should return status 201 and create should be called in case of not find any user in database', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const email = faker.internet.email()

    // @ts-ignore
    create.mockReturnValue('')

    prisma.user.findUnique = jest.fn().mockReturnValue(null)

    const response = await request(setTestApp)
      .post('/v1/saveforme/login')
      .send({
        email,
        password: 'test',
      })
      .set('Authorization', adminToken)

    expect(create).toBeCalled()
    expect(response.status).toBe(201)
  })

  it('Should return status 201 and should be called verify in case of find user in database', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const email = faker.internet.email()

    // @ts-ignore
    verify.mockReturnValue('')
    bcrypt.compare = jest.fn().mockReturnValue(true)
    prisma.user.findUnique = jest.fn().mockReturnValue({ id: 1, email, password: 'test' })

    const response = await request(setTestApp)
      .post('/v1/saveforme/login')
      .send({
        email,
        password: 'test',
      })
      .set('Authorization', adminToken)

    expect(verify).toBeCalled()
    expect(create).not.toBeCalled()
    expect(response.status).toBe(201)
  })

  it('Should return status 400 in case of find a user but password is different', async () => {
    const adminToken = 'admin'
    keys.authTokens.adminToken = adminToken
    const email = faker.internet.email()

    // @ts-ignore
    verify.mockReturnValue('')
    prisma.user.findUnique = jest.fn().mockReturnValue({ id: 1, email, password: 'test2' })

    const response = await request(setTestApp)
      .post('/v1/saveforme/login')
      .send({
        email,
      })
      .set('Authorization', adminToken)

    expect(response.status).toBe(400)
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
