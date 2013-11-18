/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  $('body').hide().fadeIn(2000); 
  initializeSocketIO();
  $('a.reveal-link').trigger('click',showMyThing);
	$('a.close-reveal-modal').trigger('click');

}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}

function showMyThing(){
$('#myModal').foundation('reveal', 'open');
}