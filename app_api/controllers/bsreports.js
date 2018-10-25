var mongoose = require('mongoose').set('debug', true);
var BsReport = mongoose.model('BsReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofBsReports = function(req, res) {
	BsReport
		.find()
		.exec(function(err, bsreports){
			if(!bsreports){
				sendJsonResponse(res, 200, { "message" : "no bsreports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, bsreports);
		});
};

module.exports.GetBsReportById = function(req, res) {
	if (req.params && req.params.reportid){
		BsReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, bsreport){
				if(!bsreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, bsreport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateBsReport = function(req, res) {
	console.log(req.body);
	var report = new BsReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateBsReport = function(req, res) {
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		BsReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, bsreport){
				if(!bsreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, "Report successfully updated!");
		});
	}
};

module.exports.DeleteBsReport = function(req, res) {
	if (req.params.reportid) {
		BsReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}else{
						sendJsonResponse(res, 200, "Report deleted successfully.");
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};