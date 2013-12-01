$(document).ready(initialize);

// *
// * GLOBAL VARIABLES
// *


var socket,user,calendar;


// *
// * INITIALIZE FUNCTION 
// *


function initialize(){ //---Still Initialize

// *
// * VEX ALERT
// *

$('#tour').on('click',function(e){
  e.preventDefault();
  vex.dialog.alert({
    message: "I'm workin!"
  })
});



// *
// * FADE LOADER
// *

$('#mainContent').fadeloader({
  mode: 'children',
  fadeSpeed: 500,
  easeLoad: 'linear'
});

// *
// * FULL WIDTH IMAGES
// *

$('#section-1').backstretch([

  '../images/bg.jpg',

  '../images/bg2.jpg',

  '../images/bg3.jpg'

  ], {duration: 3000, fade: 1000});

// *
// * FULLCALENDAR DATE VARIABLES  
// *

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();


// *
// * INITIATE FOUNDATION && SOCKET-IO  
// *

  $(document).foundation();
  initializeSocketIO();


// *
// * CLICK HANDLERS DECLARATION
// *
 $('#signUp').on('click',clickSignUp);
 $('#login').on('click', clickLogin);
 $('#eventSubmit').on('click', clickAddEvent);
 $('.eventDelete').on('click', clickDeleteEvent);
 $('#eventEdit').on('click', clickEditEvent);
 $('#createMessage').on('click', clickCreateMessage);



// *
// * FULLCALENDAR CREATION 
// *
	
	calendar = $('.calendar').fullCalendar({ //Open Fullcalendar 
    sayHello: function(){
      alert(Hello);
    },
    header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
     events: {
        url: '/getEvents',
        type: 'GET',
        error: function() {
            alert('there was an error while fetching events!');
        }
      }
    }); //Close Fullcalendar


// *
// * FLUFFYPILLOW DATE SELECTOR 
// *

  var $fp = $( '.fpPicker' );

  $fp.filthypillow({
    minDateTime: function( ) {
      return moment( ); //now
    }
  });

  $fp.on( "focus", function( ) {
    $fp.filthypillow( "show" );
  });

  $fp.on( "fp:save", function( e, dateObj ) {
    $fp.val( dateObj.format( "MMM DD YYYY hh:mm A" ) );
    $fp.filthypillow( "hide" );
  });

   var $fp2 = $( ".second" );
  $fp2.filthypillow( { 
  minDateTime: function( ) {
    return moment( ); //now
  } 
  });

  $fp2.on( "focus", function() {
    $fp2.filthypillow( "show" );
  });

  $fp2.on( "fp:save", function( e, dateObj ) {
    $fp2.val( dateObj.format( "MMM DD YYYY hh:mm A" ) );
    $fp2.filthypillow( "hide" );
  });    



}; //Closing Initialize


// *
// * CLICK HANDLER FUNCTIONS
// *

function clickSignUp(e){
  url= '/create';
  var data = $('#signUpForm').serialize();
  sendAjaxRequest(url,data,'post',null,e,function(data){
    vex.dialog.alert('Thank You for Signing Up');
    window.location.href= "/";
  });
}


function clickLogin(e){ //Open Click Login
  var url = '/signIn';
  var data = $('#loginForm').serialize();
  sendAjaxRequest(url,data,'post','put',e,function(data){
    sessionStorage.user = data.name;
    user = data.name;
    vex.dialog.alert('Good Login');
    window.location.href="/";
  });
} // Close Click Login


function clickAddEvent(e){ //**Open Click Add Event 
  e.preventDefault();
  var newEvent = {};
  
  newEvent.title = $("#title").val();
  newEvent.color = $("#color").val();
  newEvent.start = $("#start").val();
  newEvent.user = sessionStorage.user;
  newEvent.end = $("#end").val();
  socket.emit('addEvent', {data:newEvent});
} // Close Click Add Event


function clickDeleteEvent(e){ //**Open Click Delete Event
  e.preventDefault();
  var eventId = $(this).parent().data('id');
  socket.emit('deleteEvent',{eventId:eventId});
  $(this).parent().parent().remove();1
} //Close Click Delete Event

function clickEditEvent(e){//**Open Click Edit Event
	e.preventDefault();
	var url = '/events/edit';
	var data = {};
			data.id = $('h1').data('id');
			data.title = $('#title').val();
			data.start = $('#start').val();
			data.end = $('#end').val();
	sendAjaxRequest(url, data, 'post', 'put', null, function(data){
		window.location.href="/calendar";
	});

}//Close Click Edit Event


function clickCreateMessage(e){//**Open Create Message Event
e.preventDefault();
var url = '/messages/sendMessage';
var data = {};
    data.id = $('h3').data('id');
    data.title = $('#title').val();
    data.body = $('#body').val();
sendAjaxRequest(url,data,'post',null,null,function(data){
  window.location.href = '/messages';

});

}//Close Click Create Message Event


// *
// * INITIALIZE SOCKET-IO
// *


function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
  socket.on('eventSaved', socketRecievedNewEvent);
  socket.on('deletedEvent', socketDeletedEvent);
  // socket.on('eventDeleted', sockectRecievedDeletedEvent);
}

function socketDeletedEvent(){
	alert('Event Successfully Deleted');
}


function socketRecievedNewEvent(data){
  console.log(data);
  calendar.fullCalendar('renderEvent',
  {
    title: data.data.title,
    start: data.data.start,
    end: data.data.end,
    color: data.data.color
  },
    true
  );
  htmlAddEvent(data);
}



function socketConnected(data){
  console.log(data);
}


// *
// * EDIT HTML CONTENT
// *

function htmlAddEvent(data){
  var event = '<li class="'+'event'+'"><div><h3>Event Title: <a href= "calendar/' + data.data._id + '">'+data.data.title+'</a></h3><p>Start Time: '+data.data.start+'</p><p>End Time: '+data.data.end+'</p><a class="' + 'delete button alert eventDelete' +'", href="'+data.data._id+'">x</a></div></li>';
  $('#eventList').prepend(event);
}