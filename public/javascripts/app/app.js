/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  onLoads();
  clickHandlers();
  // loadChat();
  initializeSocketIO();
}

// -----------------------------------------------[On-Load Functions]----------------->

function onLoads(){
  $('body').hide().fadeIn(4000);
  $('#chatbox').hide();
  $('#chatbox').draggable({revert: false, containment: "parent", scroll: false});
}

// -----------------------------------------------[Click Handlers]----------------->

function clickHandlers(){
  $('#chatbutton').on("click", clickChatButton);
  $('#chatsendbutton').on("click", clickChatSendButton);
  $("#chatinput").keyup(function(e) {if(e.keyCode == 13) {clickChatSendButton();}});
}

// -----------------------------------------------[Click Functions]----------------->

function clickChatButton(){
  $("#chatbox").toggleClass("hidden");
  if(!$("#chatbox").hasClass("hidden")){
    $("#chatbox").hide().fadeIn(500);
    $("#chatbutton").css("background-color", "#21798a");
    $("#chatinput").focus();
  }else{
    $("#chatbox").show().fadeOut(500);
    $("#chatbutton").css("background-color", "black");
  }
}


function clickChatSendButton(){
  if($("#chatinput").val() == ""){
    alert("Enter text you must, or chat you will not!");
  }else{
    var comment = $("#chatinput").val();
    var firstname = "Heisenburg";
    var $message = $("<div>");
    $message.addClass("message");
    $message.text(firstname + ": " + comment);
    $("#chatwindow").append($message);
  }
  $("#chatinput").val("");
  $("#chatinput").focus();
}

// function clickChatSendButton(){
//   var socket = io.connect('http://localhost:3700');
//   var comment = $("#chatfield").val();
//   var name = Jack;
//   var messages = [];

//   if($("#chatinput").val() == ""){
//     alert("Enter text you must, or chat you will not!");
//   }else{
//     socket.emit('send', {message: comment, username: name.value});
//   }

//   $("#chatinput").val("");
//   $("#chatinput").focus();
// }

// -----------------------------------------------[Load Chat]----------------->

// function loadChat(){
//   var messages = [];
//   var socket = io.connect('http://localhost:3700');
//   var field = document.getElementById("chatinput");
//   var sendButton = document.getElementById("chatsendbutton");
//   var content = document.getElementById("chatinput");
//   var name = Jack;

//   socket.on('message', function (data) {
//     if(data.message) {
//         messages.push(data);
//         var html = '';
//         for(var i=0; i<messages.length; i++) {
//             html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
//             html += messages[i].message + '<br />';
//         }
//         content.innerHTML = html;
//     } else {
//         console.log("There is a problem:", data);
//     }
//   });

//   sendButton.onclick = function() {
//     if(name.value == "") {
//         alert("Please type your name!");
//     } else {
//         var text = field.value;
//         socket.emit('send', { message: text, username: name.value });

//     }
//   };
// }

// -----------------------------------------------[Initialize Socket.io]----------------->

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}