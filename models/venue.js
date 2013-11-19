var mongoose = require("mongoose");

var Venue = mongoose.Schema({
  id: String,
  shows: [],
  reviews: [],
  coordinates: []
});

mongoose.model("Venue", Venue);