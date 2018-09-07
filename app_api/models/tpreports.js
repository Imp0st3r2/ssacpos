var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({date:Date,employee:String,invoice:Number,customer:String,category:String,brand:String,model:String,quantity:Number,totalcost:Number,totalrecieved:Number,totalprofit:Number,percentagegp:Number,spiff:Number})

var tpreportSchema = new mongoose.Schema({
	startdate : Date,
	enddate : Date,
	items : [itemSchema],
	totalitems : Number,
	totalcost : Number,
	totalrecieved : Number,
	totalprofit : Number,
	totalpercentagegp : Number,
	totalspiffs : Number
})

mongoose.model('TpReport', tpreportSchema, 'tpreports');