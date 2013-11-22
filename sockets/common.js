var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('hello!', function(data){
  	console.log(data.user);
  	console.log('heard hello');
 		User.findOne({name:data.user},function(err,user){
 			if(user){
 				console.log('found user');
 				socket.emit('1',{user:user});
 			}else{
 				console.log('got err');
 				socket.emit('1',{error:err});
 			}
 		});
  });
};

function socketDisconnect(){
}

