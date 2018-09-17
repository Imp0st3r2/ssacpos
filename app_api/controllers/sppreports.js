var mongoose = require('mongoose').set('debug', true);
var SppReport = mongoose.model('SppReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofSppReports = function(req, res) {
	SppReport
		.find()
		.exec(function(err, sppreports){
			if(!sppreports){
				sendJsonResponse(res, 200, { "message" : "no sppreports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, sppreports);
		});
};

module.exports.GetSppReportById = function(req, res) {
	if (req.params && req.params.reportid){
		SppReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, sppreport){
				if(!sppreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, sppreport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateSppReport = function(req, res) {
	console.log(req.body);
	var report = new SppReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateSppReport = function(req, res) {
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		SppReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, sppreport){
				if(!sppreport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, "Report successfully updated");
		});
	}
};

module.exports.DeleteSppReport = function(req, res) {
	if (req.params.reportid) {
		SppReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}else{
						sendJsonResponse(res, 200, "Report successfully deleted");
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};