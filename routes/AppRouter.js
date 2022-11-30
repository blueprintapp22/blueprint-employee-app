const router = require('express').Router()
const controller = require('../controllers/AppController')
const qbController = require('../controllers/QuickbooksController')

router.get('/users', controller.getUsers)
router.get('/pincode/:id', controller.getPincode)
router.get('/quickbooks/business/:id', qbController.BusinessGetter)
router.get('/quickbooks', qbController.GetToken)
router.get('/quickbooks/invoice/:id', qbController.InvoiceChecker)
router.put('/pincode/:id', controller.togglePincode)
router.put('/pincode/update/:id', controller.updatePincode)
router.post('/pincode', controller.createPincode)
module.exports = router
