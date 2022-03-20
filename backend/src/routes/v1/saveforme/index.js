const { Router } = require('express')
const { saveForMeController } = require('../../../controllers')
const { requireToken } = require('../../../middlewares')

const router = Router()

router.post('/save', requireToken, saveForMeController.save)

module.exports = router
