// @ts-ignore
const router = require('express-promise-router')()
const { healthController } = require('../../../app/controllers')
const { requireHealthToken } = require('../../../app/middlewares')

/**
 * @api {get} /v1/health Health
 * @apiDescription This endpoint is used to monitored health of application
 * @apiGroup Health
 *
 * @apiPermission  healthToken
 * @apiHeader {String} Health authorization token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *    }
 *
 * @apiError (Error 4xx) {Object} NotAuthorizedError.
 * @apiError (Error 5xx) {Object} UnknownError There was an unknown error.
 *
 * @apiErrorExample {json} 401 Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": {
 *        "name": "NotAuthorizedError",
 *        "message": "Token não informado."
 *      }
 *    }
 *
 * @apiSuccessExample Success-response:
 *    HTTP/1.1 200 OK
 *  {
 *    "error": false,
 *    "status": "OK"
 *  }
 */
router.get('/', requireHealthToken, healthController.read)

module.exports = router
