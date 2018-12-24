var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({brand:String,category:String,model:String,quantity:Number,spiffamount:Number,totalcharge:Number,unitcost:Number,unitprice:Number,date:Date,salesrep:String,invoicenumber:Number,customer:String,profit:Number,percgrossprofit:Number,totalcost:Number,totalrecieved:Number})

var tpreportSchema = new mongoose.Schema({
	creationdate : Date,
	startdate : Date,
	enddate : Date,
	transactions : [transactionSchema],
	numberoftransactions : Number,
	totalitems : Number,
	totalcost : Number,
	totalrecieved : Number,
	totalprofit : Number,
	percgrossprofit : Number,
	totalspiffs : Number
})

mongoose.model('TpReport', tpreportSchema, 'tpreports');