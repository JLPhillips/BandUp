var mongoose = require("mongoose");

var Band = mongoose.Schema({
  id: String,
  members: [],
  shows: [],
  image: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("Band", Band);