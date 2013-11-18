var mongoose = require("mongoose");

var Venue = mongoose.Schema({
  shows: [],
  reviews: [],
  coordinates: []
});

mongoose.model("Venue", Venue);