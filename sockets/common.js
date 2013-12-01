var mongoose = require('mongoose');
var Band = mongoose.model('Band');
var Event = mongoose.model('Event');
var User = mongoose.model('User');
var __ = require('lodash');
var bcrypt = require('bcrypt');

exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('addEvent', sockectAddEvent);
  socket.on('signIn', socketSignIn);
  socket.on('deleteEvent',socketDeleteEvent);

	// SOCKET SAVE EVENT

  function sockectAddEvent(data){
	var newEvent = data.data;
	var event = new Event();
	event.title = newEvent.title;
	event.color = newEvent.color;
	event.start = newEvent.start;
	event.end = newEvent.end;
	event.save(function(err,event){
		console.log(event);
	User.findOne({name:newEvent.user},function(err,user){
		Band.findOne({members:user.id},function(err,band){
			band.events.push(event.id);
			band.save(function(err,band){});
			console.log(band);
			socket.emit('eventSaved',{data:event});
			});
		});
	});
	}


	// SOCKET DELETE EVENT

	function socketDeleteEvent(data){
		Event.findByIdAndRemove(data.eventId,function(err,deletedEvent){
			Band.findOne({events:deletedEvent._id}, function(err,band){
				console.log(band.events);
				__.remove(band.events, function(ev) {return ev == data.eventId});
				console.log(band.events);
				band.save(function(err){
					socket.emit('deletedEvent',{status:"ok"});
				});
			});
		});
	}



};

function socketSignIn(data){
	var login = data.data;
	console.log(login.email);
	console.log(login.password);

	User.findOne({email:login.email},function(err,user){
		console.log(user);
		bcrypt.compare(login.password, user.password, function(err,result){
			if(result){
				console.log(req.session);
				console.log('Good password');
			}else{
				console.log('not so good..');
			}
		});
	});

}




function socketDisconnect(){
}
