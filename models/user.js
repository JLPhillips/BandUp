var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")

var User = mongoose.Schema({
  name: String,
  email: {type:String, required: true, unique:true},
  password: {type: String, required: true},
  phone: {type:Number, required:true},
  // band: [{type:mongoose.Schema.Types.ObjectID, ref: "Band"}],
  music: [],
  image: String,
  createdAt: {type: Date, default: Date.now}
});

User.plugin(uniqueValidator);
mongoose.model("User", User);