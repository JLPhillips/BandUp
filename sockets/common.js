exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);

  // socket.emit('message', { message: 'Band Up!' });
  // socket.on('send', function (data) {
  //     io.sockets.emit('message', data);
  // });
};

function socketDisconnect(){
}

// exports.chat = function(socket){
//   var messages = [];
//   socket.on('message', function (data) {
//     if(data.message) {
//       messages.push(data);
//       var html = '';
//       for(var i=0; i<messages.length; i++) {
//           html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
//           html += messages[i].message + '<br />';
//         }
//       content.innerHTML = html;
//     } else {
//       console.log("There is a problem:", data);
//     }
//   });
// }
