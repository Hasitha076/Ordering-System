const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teamController')

router.post('/create', teamController.createTeam)
router.get('/getAllTeam', teamController.getAllTeam)
router.get('/getTeam/:id', teamController.getTeam)
router.put('/updateTeam/:id', teamController.updateTeam)
router.delete('/delete/:id', teamController.deleteTeam)

module.exports = router