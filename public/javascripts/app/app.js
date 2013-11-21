/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  $('body').hide().fadeIn(4000);
  $("#chatbox").hide();
  $('#chatbutton').on("click", clickChatButton);
  $('#chatsendbutton').on("click", clickChatSendButton);
  $('#chatbox').draggable({revert: false, containment: "parent", scroll: false});
  initializeSocketIO();
}

function clickChatButton(){
  $("#chatbox").toggleClass("hidden");
  if(!$("#chatbox").hasClass("hidden")){
    $("#chatbox").hide().fadeIn(500);
    $("#chatbutton").css("background-color", "#21798a");
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