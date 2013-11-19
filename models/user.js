var mongoose = require("mongoose");

var User = mongoose.Schema({
  name: String,
  id: String,
  // band: [{type:mongoose.Schema.Types.ObjectID, ref: "Band"}],
  music: [],
  image: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("User", User);