var mongoose = require('mongoose');

var taxrateSchema = new mongoose.Schema({
	date : Date,
	taxrate : Number
})

mongoose.model('TaxRate', taxrateSchema, 'taxrate');