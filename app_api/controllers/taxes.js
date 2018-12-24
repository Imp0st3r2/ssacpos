var waTaxRateLink = "http://webgis.dor.wa.gov/webapi/AddressRates.aspx?output=text&addr=1600 S Gold&city=Centralia&zip=98531";
var mongoose = require('mongoose').set('debug', true);
var moment = require ('moment');
var TaxRate = mongoose.model('TaxRate');
var request = require('request');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getTaxRate = function(req, res) {
	TaxRate
		.find()
		.exec(function(err, taxrate){
			if(!taxrate){
				sendJsonResponse(res, 200, { "message" : "no taxrate found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			// console.log(taxrate);
			if(taxrate.length === 0){
				setTaxRate(res);
			}else{
				console.log(taxrate[0].date);
				var storedTaxRateDate = new Date(taxrate[0].date);
				var currentDate = new Date();
				console.log(storedTaxRateDate);
				var storedYear = storedTaxRateDate.getFullYear();
				console.log(storedYear);
				var storedMonth = storedTaxRateDate.getMonth() + 1;
				console.log(storedMonth);
				var storedDay = storedTaxRateDate.getDate();
				// var storedDay = 28;
				console.log(storedDay);
				console.log(currentDate);
				var currentYear = currentDate.getFullYear();
				console.log(currentYear);
				var currentMonth = currentDate.getMonth() + 1;
				console.log(currentMonth);
				var currentDay = currentDate.getDate();
				// var currentDay = 30;
				console.log(currentDay);
				if(currentYear > storedYear){
					updateTaxRate(res,taxrate[0]);
				}else if(currentYear === storedYear && currentMonth > storedMonth){
					updateTaxRate(res,taxrate[0]);
				}else if(currentYear === storedYear && currentMonth === storedMonth && currentDay > storedDay){
					updateTaxRate(res,taxrate[0]);
				}else{
					console.log("No Date Change Returning DB Value.")
					var returnTaxRate = taxrate[0].taxrate;
					console.log(returnTaxRate);
					sendJsonResponse(res, 200, returnTaxRate);
				}
			}
		});
	// var d = new Date();
	// console.log(d);
	// sendJsonResponse(res,200,d);
};
var setTaxRate = function(res){
	var headers = {
		'Content-Type' : 'application/xml'
	};
	var options = {
		url: waTaxRateLink,
		method: 'GET',
		headers: headers
	};
	request(options,function(error,response,body){
		if(!error){
			var rate = body.split(" ");
			rate = rate[1];
			rate = rate.split("=");
			rate = rate[1];
			console.log(rate);
			var currentTaxRate = new TaxRate();
			currentTaxRate.taxrate = rate;
			var newdate = new Date();
			currentTaxRate.date = newdate;
			console.log(currentTaxRate.date);
			currentTaxRate.save(function(err,tr) {
				if (err) {
					console.log(err);
					sendJsonResponse(res, 400, err);
				} else {
					sendJsonResponse(res, 200, tr.taxrate);
				}
			});
		}else{
			sendJsonResponse(res,400,error);
		}
	})
}
var updateTaxRate = function(res,storedtaxrate){
	var headers = {
		'Content-Type' : 'application/xml'
	};
	var options = {
		url: waTaxRateLink,
		method: 'GET',
		headers: headers
	};
	request(options,function(error,response,body){
		// console.log(error);
		// error = "test";
		if(!error){
			var rate = body.split(" ");
			rate = rate[1];
			rate = rate.split("=");
			rate = rate[1];
			console.log(rate);
			var currentTaxRate ={
				taxrate : rate,
				date : new Date()
			}
			var taxrecord = TaxRate.findOneAndUpdate({'_id':storedtaxrate._id}, currentTaxRate, {new:true}, function(err, taxrate){
					if(!taxrate){
						sendJsonResponse(res, 404, { "message" : "taxrate not found"});
						return;
					} else if (err) {
						sendJsonResponse(res, 400, err);
						return;
					}
					console.log(taxrate);
					sendJsonResponse(res, 200, taxrate.taxrate);
			});
		}else{
			sendJsonResponse(res,400,storedtaxrate.taxrate);
		}
	})
}