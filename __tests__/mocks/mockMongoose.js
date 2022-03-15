const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongodb = new MongoMemoryServer()

/**
 * @description Creates a local mongo instance and connects to it
 */
const mongoTestConnection = async () => {
  const uri = await mongodb.getUri()
  await mongoose.connect(uri)
}

/**
 * @description Closes the local mongo instance and connection
 */
const mongoTestCloseConnection = async () => {
  await mongoose.disconnect()
  await mongodb.stop()
}

/**
 * @description Drops collections in between tests
 */
const mongoTestClearDatabase = async () => {
  const { collections } = mongoose.connection

  // eslint-disable-next-line guard-for-in
  for (const key in collections) {
    const collection = collections[key]
    // @ts-ignore
    await collection.deleteMany()
  }
}

module.exports = {
  mongoTestConnection,
  mongoTestCloseConnection,
  mongoTestClearDatabase
}
