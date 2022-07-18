var session = require("express-session");
var web = require('./routes/web')
var express = require('express')
var port = process.env.PORT || '3000' ;

app.use('/', web);

app.listen(port , ()=>{
    console.log("app listen")
})