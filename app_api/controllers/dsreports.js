var mongoose = require('mongoose').set('debug', true);
var DsReport = mongoose.model('DsReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofDsReports = function(req, res) {
	DsReport
		.find()
		.exec(function(err, dsreports){
			if(!dsreports){
				sendJsonResponse(res, 200, { "message" : "no dsreports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, dsreports);
		});
};

module.exports.GetDsReportById = function(req, res) {
	if (req.params && req.params.reportid){
		DsReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, dsreport){
				if(!dsreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, dsreport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateDsReport = function(req, res) {
	console.log(req.body);
	var report = new DsReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateDsReport = function(req, res) {
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		DsReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, dsreport){
				if(!dsreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, dsreport);
		});
	}
};

module.exports.DeleteDsReport = function(req, res) {
	if (req.params.reportid) {
		DsReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}else{
						sendJsonResponse(res, 204, {"message" : "DsReport deleted successfully."});
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};