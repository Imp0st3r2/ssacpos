var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({amountpaid : Number,dateofpayment : String});

var otherSchema = new mongoose.Schema({description : String,totalcharge : Number});

var itemSchema = new mongoose.Schema({brand : String,category : String,model : String,quantity : Number,unitprice : Number,totalcharge : Number});

var laborSchema = new mongoose.Schema({time : Number,description : String,hourlycharge : Number,totalcharge : Number});

var invoiceSchema = new mongoose.Schema({
	address: String,
	city: String,
	datecreated : String,
	datepaid : String,
	email : String,
	firstname: {type: String,required: true},
	itemcharges : Number,
	items : [itemSchema],
	laborcharges : Number,
	labors : [laborSchema],
	lastname: {type: String,required: true},
	othercharges : Number,
	others : [otherSchema],
	paid: Boolean,
	payments : [paymentSchema],
	phone : String,
	salesrep : String,
	state: String,
	taxrate : Number,
	taxdue : Number,
	totalprice : Number,
	totalafterpayments : Number,
	vehiclelicense : String,
	vehiclemake : String,
	vehiclemodel : String,
	vehiclevin : String,
	vehicleyear : String,
	zip : String
});

mongoose.model('Invoice', invoiceSchema, 'invoices');
