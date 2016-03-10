var express = require('express');
var mongoose = require('mongoose');
var dbUsers = mongoose.model('users');
var dbTeacher = mongoose.model('dbTeacher');
var router = express.Router();

router.post('/newClass', function( req, res) { //create class
	var teacher_class = new dbTeacher({
		teacher_id: req.body.teacher_id,
		class_name: req.body.class_name,
		class_id: req.body.class_id,
		year: req.body.year,
		criteria:{
			attendance: req.body.attendance,
			quiz: req.body.quiz,
			assignments: req.body.assignments,
			laboratory: req.body.lab,
			exam: req.body.exam
		}
	})
	teacher_class.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	})
});

router.get('/viewClass/:id', function(req, res){ //view class
	dbTeacher.find({}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	})
})

module.exports = router;