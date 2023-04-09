const express = require('express')
const Router = express.Router()


// Import All Controller
const {usersController} = require('../controllers') // Akan otomatis mengambil file index.js nya

// Import jwtVerify
const {tokenVerify} = require('./../middleware/verifyToken')
const  {upload} = require('./../middleware/upload')
const uploadImages = require('./../middleware/upload')
 
// Import Controller Register
Router.post('/register', usersController.register)

// Import Controller Login
Router.post('/login', usersController.login)

// // Import Controller Keep-Login
Router.post('/keep-login', tokenVerify, usersController.keepLogin)

// import profile update
Router.post('/profileimage', tokenVerify, uploadImages, usersController.updateUserProfile)

//import personal data
Router.post('/personaldata', tokenVerify, usersController.personaldata)

//import getpersonal
Router.get('/getpersonaldata', tokenVerify, usersController.getPersonalData)


// Import Controller logout => POST
// Router.post('/logout',usersController.logout);

module.exports = Router