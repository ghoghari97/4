var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var menSchema = new mongoose.Schema({
    name:{
        type:String ,
        trim : true ,
        required : true,
    },
    username:{
        type:String ,
        trim : true ,
        required : true,
    },
    Password:{
        type:String,
        trim : true ,
        required : true 
    },
    confirmPassword:{
        type:String,
        trim : true ,
        required : true 
    },
    mobile:{
        type:Number,
        trim : true ,
        required : true 
    }

});

var MenRanking = new mongoose.model("MenRanking" , menSchema );

module.exports = MenRanking ;