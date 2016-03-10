
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	students  =new mongoose.Schema( {
	student_id: String,
	class_name: String,
	class_id: String,
	year: String,
	activity:[{
		activity_type: String,
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		total_score: Number
	}]

},{ collection : 'dbStudents'} );

module.exports = students;