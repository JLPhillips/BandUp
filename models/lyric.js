var mongoose = require("mongoose");

var Lyric = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  tags: String,
  image: String,
  content: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("Lyric", Lyric);