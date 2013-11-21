var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var message = {};

exports.index = function(req, res){
  res.render('users/index', {title: 'Band Up User'});
};

exports.create = function(req, res){
	console.log('===^==Making a new User==^===');
	console.log(req.body);
	var user = new User();
	user.name = req.body.name;
	user.phone = parseInt(req.body.phone);
	user.email= req.body.email;
	bcrypt.hash(req.body.password, 10, function(err, hash){
		if(err){
			console.log('===^==Bcrypt Hash ERROR==^===');
			console.log(err)
		}else{
			user.password = hash;
			user.save(function(err,user){
				if(err){
					res.send({status:'err'});
				}else{
					res.send({status:'ok'});
					console.log('===^==Made New User==^===');
					console.log(user);
				}
			})
		}
	});
};

exports.login = function(req,res){
	console.log('===^==Login Process Start==^===');
	User.findOne({email:req.body.email}, function(err, user){
		bcrypt.compare(req.body.password, user.password, function(err, result){
			if(result){
				req.session.regenerate(function(err){
					req.session.userId = user.id; 
					req.session.name = user.name;
					req.session.save(function(err){
						console.log(req.session);
						message.status = 'okie-dokie';
						res.send([message,user])
					});
				});
			}
		})
	});
};