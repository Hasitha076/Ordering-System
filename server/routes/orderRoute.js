const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')

router.post('/create', orderController.createOrder)
router.delete('/delete/:id', orderController.cancelOrder)
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/getOrder/:id', orderController.getOrder)
router.get('/count', orderController.countOrder)
router.get('/totalIncome', orderController.totalIncome)
router.put('/status/:id', orderController.changeStatus)

module.exports = router