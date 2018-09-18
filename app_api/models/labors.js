var mongoose = require('mongoose');

var laborSchema = new mongoose.Schema({
	time : Number,
	description : String,
	hourlycharge : Number,
	totalcharge : Number,
	cost: Number
});

mongoose.model('Labor', laborSchema, 'labors');
