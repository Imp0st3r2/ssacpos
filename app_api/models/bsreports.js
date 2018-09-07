var mongoose = require('mongoose');

var bsreportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	merchandisesales : Number,
	laborsales : Number,
	totalsales : Number,
	costofmerchandise : Number,
	costoflabor : Number,
	totalcost : Number,
	grossprofit : Number,
	numberofsales : Number,
	salestaxcollected : Number
})

mongoose.model('BsReport', bsreportSchema, 'bsreports');