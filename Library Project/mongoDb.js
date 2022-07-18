const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');

const bookSchema = new mongoose.Schema({
    title: {type: 'string', required: true},
    author: {type: 'string'},
    description: {type: 'string'},
    category: {type: 'string'},
    language: {type: 'string'},
    pages: {type: 'string'},
    image:{type: 'string'}
});

const UserSchema = new mongoose.Schema({
    firstname:{type: 'string', required: true},
    lastname:{type: 'string', required: true},
    email:{type: 'string', required: true,unique: true},
    username:{type: 'string', required: true, unique: true},
    password:{type: 'string', required: true},
})

const otpSchema = new mongoose.Schema({
    username:{type: 'string', required: true},
    otp: {type: 'string', required: true},
    createdAt:{type: Date, expires: '2m', default: Date.now }
})

const BookModel = mongoose.model('Book',bookSchema);
const UserModel = mongoose.model('User',UserSchema);
const OtpModel = mongoose.model('OTP',otpSchema);
module.exports = {BookModel,UserModel,OtpModel};