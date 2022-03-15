require('dotenv').config()

const db = require('../src/app/models')

async function sync() {
  console.log('Schema authenticated')
  await db.sequelize.authenticate()

  console.log('Syncing schema')
  await db.sequelize.sync()

  console.log('Schema synced')
  await db.sequelize.close()
}

sync()
  .then(() => console.log('sync finished'))
  .catch(error => console.error('error on sync: ', error))
