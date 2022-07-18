const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/trynerror");
const app = express();
app.use(express.json());

app.set('view engine','ejs');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.get('/home',(req,res)=>{
    res.send("hello");
    jwt.sign()
})





app.listen(5500);
