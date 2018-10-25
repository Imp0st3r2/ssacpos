var waTaxRateLink = "http://webgis.dor.wa.gov/webapi/AddressRates.aspx?output=text&addr=1600 S Gold&city=Centralia&zip=98531";
var request = require('request');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getTaxRate = function(req, res) {
	// var headers = {
	// 	'Content-Type' : 'application/xml'
	// };
	// var options = {
	// 	url: waTaxRateLink,
	// 	method: 'GET',
	// 	headers: headers
	// };
	// request(options,function(error,response,body){
	// 	if(!error && response.statusCode == 200){
	// 		var rate = body.split(" ");
	// 		rate = rate[1];
	// 		rate = rate.split("=");
	// 		rate = rate[1];
	// 		sendJsonResponse(res,200,rate);
	// 	}else{
	// 		sendJsonResponse(res, 404, error);
	// 	}
	// })
	var rate = .082;
	sendJsonResponse(res,200,rate);
};