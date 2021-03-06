const { Router } = require('express')
const { saveForMeController } = require('../../../controllers')
const { requireToken, Validator } = require('../../../middlewares')

const router = Router()

/**
 * @api {post} /v1/saveforme/
 * @apiDescription Service responsible for the CRUD of SaveForMeService
 *
 *
 * @apiExample {curl} Example usage:
 *    curl -i https://www.saveforme.com.br/v1/saveforme/
 *
 * @apiSuccess {email} Email of the user
 * @apiSuccess {Object} Data object of link
 * @apiSuccess {Number} data.id Id of link in database
 * @apiSuccess {String} data.link Link of website that going to save
 * @apiSuccess {Array} data.keywords Array with keywords used to identify that website
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *         "error": false,
 *         "message": {
 *             "id": "624395b3abd7342562fff060",
 *             "email": "joao3@proton.com",
 *             "data": [
 *                 {
 *                     "id": 668519158390,
 *                     "link": "www.facebook.com",
 *                     "keywords": [
 *                         "aaaa",
 *                         "b",
 *                         "c"
 *                     ]
 *                 },
 *                 {
 *                     "id": 668519158390,
 *                     "link": "www.zirop.com",
 *                     "keywords": [
 *                         "aaaa",
 *                         "b",
 *                         "c"
 *                     ]
 *                 }
 *             ],
 *             "createdAt": "2022-03-29T23:26:43.068Z",
 *             "updatedAt": "2022-03-29T23:57:24.929Z"
 *         }
 *     }
 * @apiGroup SaveForMe
 * @apiHeader {String} authorization AdminToken.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "authorization": <token>
 *    }
 *
 * @apiName saveforme
 *
 * @apiPermission Admin
 */
router.post('/', requireToken, Validator('crudSaveForMe'), saveForMeController.save)

/**
 * @api {post} /v1/saveforme/login
 * @apiDescription Service responsible for the login of SaveForMeService
 *
 *
 * @apiExample {curl} Example usage:
 *    curl -i https://www.saveforme.com.br/v1/saveforme/login
 *
 * @apiSuccess {email} Email of the user
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *         "error": false,
 *         "login": true
 *     }
 * @apiGroup SaveForMe
 * @apiHeader {String} authorization AdminToken.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "authorization": <token>
 *    }
 *
 * @apiName saveforme
 *
 * @apiPermission Admin
 */
router.post('/login', requireToken, Validator('login'), saveForMeController.login)

module.exports = router
