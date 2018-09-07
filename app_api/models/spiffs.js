var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var spiffSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	amount: Number
});

mongoose.model('Spiff', spiffSchema, 'spiffs');
