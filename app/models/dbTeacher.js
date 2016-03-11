
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	teacher  =new mongoose.Schema( {
	teacher_name: String,
	teacher_id: String,
	class_name: String,
	class_id: String,
	year: String,
	criteria:{
		attendance: Number,
		quiz: Number,
		assignments: Number,
		laboratory: Number,
		exam: Number,
	},
	activity:[{
		student_id: String,
		student_name: String,
		activity_type: String,
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		total_score: Number,
		term: String
	}]

},{ collection : 'dbTeachers'} );

module.exports = teacher;