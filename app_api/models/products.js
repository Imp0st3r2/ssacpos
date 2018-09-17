var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	upc : {
		type : String
	},
	brand: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required : true
	},
	spiff : Number,
	channels:Number,
	distortion : Number,
	snratio : Number,
	frequencyresponse : Number,
	outputpower : Number,
	dimensionsh : Number,
	dimensionsw : Number,
	dimensionsl : Number,
	size : String,
	sensitivity : Number,
	configuration : String,
	peakwatts : Number,
	rmswatts : Number,
	mountingdepth : Number,
	preouts : Number,
	weight : Number,
	amperehours : Number,
	voltage : Number,
	description: String,
	bluetooth : Boolean,
	usb : Boolean,
	cdrrw : Boolean,
	mp3 : Boolean,
	wma : Boolean,
	wave : Boolean,
	builtinamp : Boolean,
	quantity : Number
});

mongoose.model('Product', productSchema, 'products');
