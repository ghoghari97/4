var express = require('express')
var router = express.Router()
var studentcontroller = require('../controllers/studentcontroller')

router.get('/getsessioninfo',studentcontroller.get_session_info) 