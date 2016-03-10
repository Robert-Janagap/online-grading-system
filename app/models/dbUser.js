
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	users  =new mongoose.Schema( {
	userId: Number,
    username: String,
    password: String,
    name: String,
    role:String,
    email: String
},{ collection : 'users' } );

module.exports = users;