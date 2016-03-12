var express = require('express');
var mongoose = require('mongoose');
var dbUsers = mongoose.model('users');
var dbTeacher = mongoose.model('dbTeacher');
var dbStudents = mongoose.model('dbStudents');
var router = express.Router();

router.get('/findClass/:id', function( req, res) {
	dbTeacher.findOne({class_id:req.params.id}, function( err, data){
		if(err){
			return err;
		};
		res.json(data);
	});
});
router.post('/joinClass', function( req, res) {
	var newClass = new dbStudents({
		student_id: req.body.student_id,
		student_name: req.body.student_name,
		teacher_name: req.body.teacher_name,
		teacher_id: req.body.teacher_id,
		class_name: req.body.class_name,
		class_id: req.body.class_id,
		year: req.body.year,
		attendance: req.body.criteria.attendance,
		quiz: req.body.criteria.quiz,
		assignments: req.body.criteria.assignments,
		laboratory: req.body.criteria.laboratory,
		exam: req.body.criteria.exam
	});
	newClass.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	})
});

router.get('/classList/:id', function(req, res){
	dbStudents.find({student_id:req.params.id}, function( err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
router.get('/yourClass/:id', function(req, res){
	dbStudents.find({student_id: req.params.id}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
module.exports = router;