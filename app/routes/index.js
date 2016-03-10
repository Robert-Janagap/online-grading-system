var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var mUsers = mongoose.model('users');
var passport = require('passport');

router.post('/sign-up', function( req, res) {
	var newUser = new mUsers(req.body);
	mUsers.findOne({'username': req.body.username}, function(err, data){
		if(!data){
			newUser.save(function(err, data){
				if (err){
					return err;
				};
				res.json(data);
			});
		}else{
			var confirm = "exist";
			res.json(confirm);
		}
	});
});


router.get('/loggedin', function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});
router.post('/logout', function(req, res){
	req.logOut();
	res.sendStatus(200);
});
module.exports = router;