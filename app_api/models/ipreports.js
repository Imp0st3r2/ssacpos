var mongoose = require('mongoose');

var installSchema = new mongoose.Schema({installer : String,installdate : Date,invoice : Number,hours : Number,spiff : Number,rate: Number,recieved: Number,profit : Number});

var ipreportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	employee : String,
	installs : [installSchema],
	totalrecieved : Number,
	totalrate : Number,
	totalprofit : Number,
	totalspiffs : Number
})

mongoose.model('IpReport', ipreportSchema, 'ipreports');