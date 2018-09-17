var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({brand : String,category : String,model : String,quantity : Number,unitprice : Number,spiffamount: Number,totalcharge : Number,unitcost : Number});

var sppreportSchema = new mongoose.Schema({
	creationdate : Date,
	startdate : Date,
	enddate : Date,
	employee : String,
	items : [itemSchema],
	totalitems : Number,
	totalitemcost : Number,
	totalitemprice : Number,
	percgp : Number,
	totalprofit : Number,
	totalspiffs : Number
})

mongoose.model('SppReport', sppreportSchema, 'sppreports');