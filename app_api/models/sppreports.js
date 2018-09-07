var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({brand : String,category : String,model : String,quantity : Number,unitprice : Number,spiffamount: Number,totalcharge : Number});

var sppreportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	employee : String,
	items : [itemSchema],
	totalitems : Number,
	totalitemcost : Number,
	totalitemprice : Number,
	totalprofit : Number,
	totalspiffs : Number
})

mongoose.model('SppReport', sppreportSchema, 'sppreports');