var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var menSchema = new mongoose.Schema({
    name:{
        type:String ,
        trim : true ,
    },
    Email:{
        type:String ,                                                                                         
        trim : true ,
        required : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error("Email is not valid");
            }
        }
    },
    Password:{
        type:String,
        trim : true ,
        required : true 
    }

});

var MenRanking = new mongoose.model("MenRanking" , menSchema );

module.exports = MenRanking ;