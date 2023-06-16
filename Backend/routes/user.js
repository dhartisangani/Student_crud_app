const express = require('express')
const router = express.Router();
const User = require('../modals/User')
const fetchuser = require('../middleWare/fetchuser');
const { signup, login, forgotPassword } = require('../Controller/authController');

// create new user
router.post('/signup', signup)

//login 
router.post('/signin', login)
//forgot password 

router.put('/setpwd', forgotPassword)

module.exports = router
