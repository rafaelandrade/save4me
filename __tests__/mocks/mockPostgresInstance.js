/* eslint-disable no-undef */

const mockPostgresInstance = () => {
  return { changed: jest.fn(), save: jest.fn(), update: jest.fn(), created: jest.fn() }
}

module.exports = mockPostgresInstance
