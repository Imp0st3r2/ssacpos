var mongoose = require('mongoose').set('debug', true);
var TpReport = mongoose.model('TpReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofTpReports = function(req, res) {
	TpReport
		.find()
		.exec(function(err, tpreports){
			if(!tpreports){
				sendJsonResponse(res, 200, { "message" : "no tpreports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, tpreports);
		});
};

module.exports.GetTpReportById = function(req, res) {
	if (req.params && req.params.reportid){
		TpReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, tpreport){
				if(!tpreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, tpreport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateTpReport = function(req, res) {
	console.log(req.body);
	var report = new TpReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateTpReport = function(req, res) {
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		TpReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, tpreport){
				if(!tpreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, tpreport);
		});
	}
};

module.exports.DeleteTpReport = function(req, res) {
	if (req.params.reportid) {
		TpReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}else{
						sendJsonResponse(res, 204, {"message" : "TpReport deleted successfully."});
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};