
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	students  =new mongoose.Schema( {
	student_id: String,
	student_name: String,
	teacher_name: String,
	teacher_id: String,
	class_name: String,
	class_id: String,
	year: String,
	attendance: Number,
	quiz: Number,
	assignments: Number,
	laboratory: Number,
	exam: Number,
	attendance_record:[{
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		term: String
	}],
	quiz_record:[{
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		totalScore: Number,
		term: String
	}],
	laboratory_record:[{
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		totalScore: Number,
		term: String
	}],
	assignments_record:[{
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		totalScore: Number,
		term: String
	}],
	exam_record:[{
		activity_id: String,
		activity_name: String,
		activity_date: String,
		score: Number,
		totalScore: Number,
		term: String
	}]

},{ collection : 'dbStudents'} );

module.exports = students;