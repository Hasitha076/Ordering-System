const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

router.post('/create', productController.createProduct)
router.patch('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProduct/:id', productController.getProduct)
router.get('/count', productController.countProducts)
router.get('/search/:productName', productController.search)

module.exports = router