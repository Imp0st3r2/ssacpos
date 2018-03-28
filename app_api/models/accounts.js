var mongoose = require('mongoose');

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

mongoose.model('Account', accountSchema, 'accounts');