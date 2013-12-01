var mongoose = require('mongoose');

var Message = mongoose.Schema({
	title				: {type:String, required: true},
	body				: {type: String, required: true},
	createdAt		: {type: Date, default: Date.now}
});

mongoose.model("Message",Message);