var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({amountpaid:Number,dateofpayment:Date,paymenttype:String})

var invoiceSchema = new mongoose.Schema({datepaid:Date,employee:String,customer:String,invoice:Number,payments:[paymentSchema],totalpayments:Number})

var dsreportSchema = new mongoose.Schema({
	creationdate : Date,
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
	grandtotal : Number
})

mongoose.model('DsReport', dsreportSchema, 'dsreports');