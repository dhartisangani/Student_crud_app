const express = require('express')
const router = express.Router();
const User = require('../modals/User')
const fetchuser = require('../middleWare/authToken');
const { signup, login, forgotPassword } = require('../Controller/authController');
const user = process.env.BASE_URI_USER
const userSignup = process.env.USER_SIGNUP
const userSignin = process.env.USER_SIGNIN
const userforgotPassword = process.env.USER_RESET_PASSWORD

// create new user
router.post(userSignup, signup)

//login 
router.post(userSignin, login)

//forgot password 
router.put(userforgotPassword, forgotPassword)

module.exports = router
