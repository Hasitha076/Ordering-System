const express = require('express')
const router = express()

const verifyTokenMiddleware = require('../middleware/AuthMiddleware')
const customerController = require('../controllers/customerController')

router.post('/create', customerController.createCustomer)
router.put('/update/:id', customerController.updateCustomer)
router.delete('/delete/:id', customerController.deleteCustomer)
router.get('/getAllCustomers', customerController.getAllCustomers)
router.get('/getCustomer/:id', customerController.getCustomer)
router.get('/count', customerController.countCustomers)
router.get('/search/:name', customerController.serach)

module.exports = router