var express = require('express');
var mongoose = require('mongoose');
var dbUsers = mongoose.model('users');
var dbTeacher = mongoose.model('dbTeacher');
var dbStudents = mongoose.model('dbStudents');
var router = express.Router();

router.post('/newClass', function( req, res) { //create class
	var teacher_class = new dbTeacher({
		teacher_name: req.body.teacher_name,
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

router.get('/viewClass/:id', function(req, res){ //view classes
	dbTeacher.find({}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	})
})
router.get('/studentList/:id', function(req, res){ //view class
	dbStudents.find({teacher_id: req.params.id}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	})
})

router.put('/newAttendance', function(req, res){ //add attendance

		dbStudents.update({student_id: req.body.student_id, class_id:req.body.class_id}, {$addToSet:{attendance_record:{ //update attendance
			activity_id: req.body.activity_id,
			activity_name: req.body.activity_name,
			activity_date: req.body.activity_date,
			score: req.body.score,
			term: req.body.term
		}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
			
})
router.put('/newQuiz', function(req, res){ //add quiz

		dbStudents.update({student_id: req.body.student_id, class_id:req.body.class_id}, {$addToSet:{quiz_record:{ 
			activity_id: req.body.activity_id,
			activity_name: req.body.activity_name,
			activity_date: req.body.activity_date,
			score: req.body.score,
			totalScore: req.body.totalScore,
			term: req.body.term
		}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});

})
router.put('/newAssign', function(req, res){ //add Assignmets

		dbStudents.update({student_id: req.body.student_id, class_id:req.body.class_id}, {$addToSet:{assignments_record:{ 
			activity_id: req.body.activity_id,
			activity_name: req.body.activity_name,
			activity_date: req.body.activity_date,
			score: req.body.score,
			totalScore: req.body.totalScore,
			term: req.body.term
		}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});

})
router.put('/newLab', function(req, res){ //add Lab

		dbStudents.update({student_id: req.body.student_id, class_id:req.body.class_id}, {$addToSet:{laboratory_record:{ 
			activity_id: req.body.activity_id,
			activity_name: req.body.activity_name,
			activity_date: req.body.activity_date,
			score: req.body.score,
			totalScore: req.body.totalScore,
			term: req.body.term
		}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});

})
router.put('/newExam', function(req, res){ //add Exam

		dbStudents.update({student_id: req.body.student_id, class_id:req.body.class_id}, {$addToSet:{exam_record:{ 
			activity_id: req.body.activity_id,
			activity_name: req.body.activity_name,
			activity_date: req.body.activity_date,
			score: req.body.score,
			totalScore: req.body.totalScore,
			term: req.body.term
		}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});

})
router.put('/cancelAttendance', function(req, res){ //add attendance
	dbStudents.findOne({student_id: req.body.student_id, class_id:req.body.class_id}, function(err, data){
		dbStudents.update({'attendance_record.activity_id':data.activity_id}, {$set:{activity_id:""}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	});
})

router.get('/classStudents/:id', function(req, res){
	dbStudents.find({class_id: req.params.id}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});

router.get('/viewPrelim/:id', function(req, res){
	dbStudents.find({class_id: req.params.id},{attendance_record:{$elemMatch:{term: "prelim"}}}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
router.get('/viewMidterm/:id', function(req, res){
	dbStudents.find({class_id: req.params.id},{attendance_record:{$elemMatch:{term: "midterm"}}}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});


router.get('/getAttendance', function(req, res){
	dbStudents.fint({student_id:req.body.student_id}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});

module.exports = router;