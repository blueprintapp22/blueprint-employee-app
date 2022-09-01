const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put('/profile', middleware.stripToken, middleware.verifyToken)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
router.delete('/user/:id', controller.DeleteUser)
router.put('/user/access/:id', controller.GrantAccess)
module.exports = router
