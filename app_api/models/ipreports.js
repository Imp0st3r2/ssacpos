var mongoose = require('mongoose');

var installSchema = new mongoose.Schema({installer : String,installdate : Date,invoice : Number,hours : Number,cost: Number,rate: Number,recieved: Number,profit : Number,description: String});

var ipreportSchema = new mongoose.Schema({
	creationdate : Date,
	startdate : Date,
	enddate : Date,
	employee : String,
	installs : [installSchema],
	totalcost: Number,
	totalrecieved : Number,
	totalrate : Number,
	totalprofit : Number
})

mongoose.model('IpReport', ipreportSchema, 'ipreports');