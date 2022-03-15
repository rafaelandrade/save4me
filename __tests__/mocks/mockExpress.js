/* eslint-disable no-undef */

/**
 * @typedef {Object} express
 * @property {Object} res
 * @property {Object} next
 * @property {Object} req
 */

const mockExpressRes = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}

/**
 * @module
 * @return {express}
 */
module.exports = {
  res: mockExpressRes(),
  next: jest.fn(),
  req: { body: {}, params: {}, headers: { authorization: '' }, query: {} }
}
