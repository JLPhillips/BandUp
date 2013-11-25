var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);

  socket.on('send', function (data){
  	console.log(data.message, data.username);
  	var message = data.message;
  	var username = data.username;
  	socket.emit('gotMessage', {username:username, message:message});
  });


  socket.on('message', function (data) {
    if(data.message) {
        messages.push(data);
        var html = '';
        for(var i=0; i<messages.length; i++) {
            html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
            html += messages[i].message + '<br />';
        }
        content.innerHTML = html;
        $("#content").scrollTop($("#content")[0].scrollHeight);
    } else {
        console.log("There is a problem:", data);
    }
});

};

function socketDisconnect(){
}
