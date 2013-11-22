/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){

  $('#login').on('click', clickLogin);
  $('.logout').on('click', clickLogOut);


/*
  *
  *
  * Calendar Functionality 
  * 
  *
*/


	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
  $(document).foundation();
  $('body').hide().fadeIn(4000); 
  $('#cal').fullCalendar({
  	header: {
  		left:'prev,next today',
  		center: 'title',
  		right: 'month, agendaWeek, agendaDay'
  	},
  	dayClick: function(){
  		alert('Click events work');
  	},
  	editable: true,
  	events: [
  	{
  		title: 'All Day Event',
  		start: new Date(y, m, d)
  	},
  	{
  		title: 'Long Event',
  		start: new Date(y, m, 10),
  		end: new Date(y,m,15),
  	}
  	]
  });
  initializeSocketIO();
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



/*
  *
  *
  * Click Handlers 
  * 
  *
*/

function clickLogin(e){
  alert('I was clicked');
  var url = '/login';
  var data = $('#loginForm').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e , function(data){
  getFancyWithIt(data);
  });
}

function clickLogOut(e){
  var answer = confirm('You are about to LogOut');
  if(answer){ 
    var url = '/logout';
    sendAjaxRequest(url, {}, 'post','delete',e,function(data){
      window.load('/');
    });
  }else{
    e.preventDefault;
    window.location.href='/';
  }
}

/*
  *
  *
  * HTML Fancifiers
  * 
  *
*/

function getFancyWithIt(data){
  if(data[0].status === 'okie-dokie'){
    alert('YAY');
  }else{
    alert('thats what I call failure');
  }
}



/*
  *
  *
  * Define Utilities
  * 
  *
*/


function sendAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb){
    if(typeof data === 'string'){
      options.data += '&_method=' + altVerb;
    } else {
      options.data._method = altVerb;
    }
  }

  $.ajax(options);
  if(event) {event.preventDefault();}
}
