const express = require('express')
const Router = express.Router()


// Import All Controller
const {usersController} = require('../controllers') // Akan otomatis mengambil file index.js nya



module.exports = Router