/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  onLoads();
  clickHandlers();
  initializeSocketIO();
}

// -----------------------------------------------[On-Load Functions]----------------->

function onLoads(){
  $('body').hide().fadeIn(4000);
  $("#chatbox").hide();
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

function chatSendButtonGuts(){
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