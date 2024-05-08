const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/refresh', userController.refresh)
router.post('/logout', userController.logout)
router.get('/loginStatus', userController.loginStatus)

module.exports = router