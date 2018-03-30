var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({amountpaid : Number,dateofpayment : String});

var otherSchema = new mongoose.Schema({description : String,totalcharge : Number});

var itemSchema = new mongoose.Schema({brand : String,category : String,model : String,quantity : Number,unitprice : Number,totalcharge : Number});

var laborSchema = new mongoose.Schema({time : Number,description : String,hourlycharge : Number,totalcharge : Number});

var accountSchema = new mongoose.Schema({
	address: {type:String,required:true},
	city: {type:String, required:true},
	email : {type:String},
	firstname: {type: String,required: true},
	lastname: {type: String,required: true},
	phone : {type:String,required:true},
	state: {type:String,required:true},
	zip : {type:String,required:true},
	taxexempt : Boolean
});

var invoiceSchema = new mongoose.Schema({
	account : accountSchema,
	datecreated : {type:Date,default:Date.now},
	datepaid : String,
	invoicenumber : Number,
	itemcharges : Number,
	items : [itemSchema],
	laborcharges : Number,
	labors : [laborSchema],
	othercharges : Number,
	others : [otherSchema],
	paid: Boolean,
	payments : [paymentSchema],
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
	vehicleyear : String
});

mongoose.model('Invoice', invoiceSchema, 'invoices');
