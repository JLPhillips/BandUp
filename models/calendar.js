var mongoose = require("mongoose");

var Calendar = mongoose.Schema({
  practices: [],
  shows: [],
  availability: []
});

mongoose.model("Calendar", Calendar);