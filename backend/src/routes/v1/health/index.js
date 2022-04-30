const { Router } = require('express')
const { healthController } = require('../../../controllers')

const router = Router()

router.get('/', healthController)

module.exports = router
