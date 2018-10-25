var mongoose = require('mongoose').set('debug', true);
var IpReport = mongoose.model('IpReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofIpReports = function(req, res) {
	IpReport
		.find()
		.exec(function(err, ipreports){
			if(!ipreports){
				sendJsonResponse(res, 200, { "message" : "no ipreports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, ipreports);
		});
};

module.exports.GetIpReportById = function(req, res) {
	if (req.params && req.params.reportid){
		IpReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, ipreport){
				if(!ipreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, ipreport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateIpReport = function(req, res) {
	console.log(req.body);
	var report = new IpReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateIpReport = function(req, res) {
	console.log(req.params);
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		IpReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, ipreport){
				if(!ipreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, "IpReport updated successfully.");
		});
	}
};

module.exports.DeleteIpReport = function(req, res) {
	if (req.params.reportid) {
		IpReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 400, err);
						return;
					}else{
						sendJsonResponse(res, 200, "IpReport deleted successfully.");
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};