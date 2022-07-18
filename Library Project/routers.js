const express = require('express');
const router = express.Router();
const BookModel = require('./mongoDb');
const JWTFun = require('./middleware/jwtauth');
var {BookController,UserController} = require('./controller');
const upload = require('./middleware/multer');
router.get('/',(req,res)=>{
    res.render('addbook');
})

router.post('/',upload.single('image'),BookController.addbook);
router.get('/showbook',BookController.showbook);
router.post('/:image',BookController.bookdetails);
router.post('/sort/name',BookController.sort);
router.post('/user/signup',UserController.signup);
router.get('/users/allusers',UserController.showallusers);
router.post('/users/login',UserController.login);
router.post('/users/changePassword',UserController.changePassword);
// router.post('/users/forgotPassword',UserController.forgotPassword);
// router.post('/users/checkOTP',UserController.checkOTP);
router.post('/users/forgottenPassword',UserController.forgottenpassword);
router.post('/users/checkOTP',UserController.checkOTP);
router.get('/users/profile',JWTFun.checkAuth,UserController.profile);
router.get('/users/user/redi/:token',UserController.redir);
// router.post('/users/user/redi/:token',UserController.redir);
router.post('/users/sendToken',UserController.sendToken);

module.exports = router;
