var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	invoices : [String],
	products : [String],
	invoicetotal : Number,
	payments : [Number],
	paymenttotal : Number
});

mongoose.model('Report', reportSchema, 'reports');
