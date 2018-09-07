var mongoose = require('mongoose').set('debug', true);
var StReport = mongoose.model('StReport');
var moment = require('moment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.GetListofStReports = function(req, res) {
	StReport
		.find()
		.exec(function(err, streports){
			if(!streports){
				sendJsonResponse(res, 200, { "message" : "no streports found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, streports);
		});
};

module.exports.GetStReportById = function(req, res) {
	if (req.params && req.params.reportid){
		StReport
			.findOne({_id : req.params.reportid})
			.exec(function(err, streport){
				if(!streport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, streport);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No report id in request."});
	}
};

module.exports.CreateStReport = function(req, res) {
	console.log(req.body);
	var report = new StReport(req.body);
	report.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, "Report successfully created");
		}
	});
};

module.exports.UpdateStReport = function(req, res) {
	if(!req.params.reportid){
		sendJsonResponse(res, 404, {
			"message": "Not found, reportid is required"
		});
		return;
	}else{
		var report = req.body;
		StReport.findOneAndUpdate({'_id':report._id}, report, {new:true}, function(err, streport){
				if(!streport){
					sendJsonResponse(res, 404, { "message" : "report not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				sendJsonResponse(res, 200, streport);
		});
	}
};

module.exports.DeleteStReport = function(req, res) {
	if (req.params.reportid) {
		StReport
			.findByIdAndRemove(req.params.reportid)
			.exec(
				function(err){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}else{
						sendJsonResponse(res, 204, {"message" : "StReport deleted successfully."});
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No reportid in the request." 
		});
	}
};