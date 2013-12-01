var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.findUser = function(req, res, next){
	console.log('Making middleware request');
	if(req.session.userId){
		User.findById(req.session.userId, function(err, user){
			if(user){
				res.locals.user = user;
				next();
			}
		});
	} else {
		console.log('Moving to next');
		next();
	}
};