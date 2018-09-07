var mongoose = require('mongoose');

var streportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	taxrate : Number,
	totalsales : Number,
	taxablesales : Number,
	taxowed : Number,
	taxrecieved : Number
})

mongoose.model('StReport', streportSchema, 'streports');