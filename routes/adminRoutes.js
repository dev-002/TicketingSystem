const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const {getAllUsersController , getAllEngineersController , changeAccountStatusController} = require('../controllers/adminControl');
const router = express.Router()

//Get method  || Users
router.get('/getAllUsers', authMiddleware, getAllUsersController )

//Get Method || Engineers
router.get('/getAllEngineers', authMiddleware, getAllEngineersController)

//Post Account Status
router.post('/changeAccountStatus', authMiddleware , changeAccountStatusController)

module.exports = router;