var jsonexport = require('jsonexport');
var fs = require('fs');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.exportCSV = function(req, res) {
	var dataToExport = req.body;
	var filename = req.params.csvname;
	console.log(filename);
	jsonexport(dataToExport, function(err,csv){
		if(err){
			sendJsonResponse(res,400,err);
		}else{
			fs.writeFile('public/Exports/'+filename+'.csv', csv, 'utf8', function(err){
				if(err){
					sendJsonResponse(res,400,err);
				}else{
					sendJsonResponse(res,200,"Successfully wrote file: "+filename+".csv");
				}
			})
		}
	})
};