const { Router } = require('express')
const { healthController } = require('../../../controllers')
const { requireToken } = require('../../../middlewares')

const router = Router()

router.get('/', requireToken, healthController)

module.exports = router
