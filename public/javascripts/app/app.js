/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  $('body').hide().fadeIn(4000);
  $('#chatbutton').on("click", clickChatButton);
  $('#chatsendbutton').on("click", clickChatSendButton);
  initializeSocketIO();

}

function clickChatButton(){
  $("#chatbox").toggleClass("hidden");
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
  // $("#chatwindow").text("Jack: " + comment);

  $("#chatinput").val("");
  $("#chatinput").focus();
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