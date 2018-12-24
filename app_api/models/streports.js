var mongoose = require('mongoose');

var streportSchema = new mongoose.Schema({
	creationdate : Date,
	startdate : Date,
	enddate : Date,
	state: String,
	taxtype : String,
	taxrate : Number,
	totalsales : Number,
	taxablesales : Number,
	tax : Number
})

mongoose.model('StReport', streportSchema, 'streports');