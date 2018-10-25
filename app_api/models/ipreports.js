var mongoose = require('mongoose');

var installSchema = new mongoose.Schema({installer : String,installdate : Date,invoicenumber : Number,time : Number,cost: Number,hourlycharge: Number,totalcharge: Number,profit : Number,description: String});

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