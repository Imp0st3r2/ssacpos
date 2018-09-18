var mongoose = require('mongoose').set('debug', true);
var Labor = mongoose.model('Labor');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.laborsList = function(req, res) {
	Labor
		.find()
		.exec(function(err, labors){
			if(!labors){
				sendJsonResponse(res, 404, { "message" : "no labors found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, labors);
		});
};
module.exports.laborsCreate = function(req, res) {
	console.log(req);
	var labor = new Labor(req.body);

	labor.save(function(err) {
		if (err) {
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, labor.description + " successfully created");
		}
	});
};
module.exports.laborsReadOne = function(req, res) {
	if (req.params && req.params.laborid){
		Labor
			.findById(req.params.laborid)
			.exec(function(err, labor){
				if(!labor){
					sendJsonResponse(res, 404, { "message" : "laborid not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, labor);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No laborid in request."});
	}
};
module.exports.laborsUpdateOne = function(req, res) {
	if(!req.params.laborid){
		sendJsonResponse(res, 404, {
			"message": "Not found, laborid is required"
		});
		return;
	}
	Labor
		.findById(req.params.laborid)
		.exec(
			function(err, labor) {
				if(!labor) {
					sendJsonResponse(res, 404, {
						"message" : "laborid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				labor.time = req.body.time;
				labor.description = req.body.description;
				labor.hourlycharge = req.body.hourlycharge;
				labor.totalcharge = req.body.totalcharge;
				labor.cost = req.body.cost;
				labor.save(function(err, labor){
					if (err) {
						sendJsonResponse(res, 400, err);
					} else {
						sendJsonResponse(res, 200, labor);
					}
				});
			}
		);
};
module.exports.laborsDeleteOne = function(req, res) {
	if (req.params.laborid) {
		Labor
			.findByIdAndRemove(req.params.laborid)
			.exec(
				function(err, labor){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 204, labor);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No laborid"
		});
	}
};