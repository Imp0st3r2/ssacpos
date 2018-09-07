var mongoose = require('mongoose');

var invoiceSchema = new mongoose.Schema({date:Date,employee:String,customer:String,invoice:Number,paymenttype:String,paymentamount:Number})

var dsreportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	invoices : [invoiceSchema],
	totalcash : Number,
	totalchecks : Number,
	totalvisa : Number,
	totalamex : Number,
	totalmastercard : Number,
	totaldiscover : Number,
	totalother : Number,
	totalrecieved : Number
})

mongoose.model('DsReport', dsreportSchema, 'dsreports');