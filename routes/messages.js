var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User	= mongoose.model('User');

exports.createMessage = function(req,res){
	User.findById(req.params.id,function(err,recipient){
		res.render('messages/create',{title:'Send Message to '+ recipient.name + '.', recipient:recipient})
	});
}

exports.sendMessage = function(req,res){
	var message = new Message();
	message.title = req.body.title;
	message.body = req.body.body;
	message.save(function(err,message){
		User.findById(req.body.id,function(err,user){
			user.messages.push(message.id);
			user.save(function(err,user){
				res.send({status:'ok'});
			});
		});
	});
}