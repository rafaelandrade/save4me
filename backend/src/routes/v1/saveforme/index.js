const { Router } = require('express')
const { saveForMeController } = require('../../../controllers')
const { requireToken } = require('../../../middlewares')

const router = Router()

/**
   * @api {get} /v1/saveforme/
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
   *      "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   *    }
   *
   * @apiName saveforme
   *   *
   * @apiPermission Admin
   */
router.post('/', requireToken, saveForMeController.save)

module.exports = router
