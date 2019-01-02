var mongoose = require('mongoose').set('debug', true);
var Spiff = mongoose.model('Spiff');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.spiffsList = function(req, res) {
	if (req.params){
		Spiff
			.find()
			.exec(function(err, spiff){
				if(!spiff){
					sendJsonResponse(res, 404, { "message" : "no spiffs found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, spiff);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No spiffid in request."});
	}
};
module.exports.spiffsCreate = function(req, res) {
	console.log(req);
	if(!req.body.name || !req.body.amount) {
		sendJsonResponse(res, 400, {"message": "All fields required"});
	return;
	}
	var spiff = new Spiff();

	spiff.name = req.body.name;
	spiff.amount = req.body.amount;

	spiff.save(function(err) {
		if (err) {
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, spiff.name + "-" + spiff.amount + " successfully created");
		}
	});
};
module.exports.spiffsReadOne = function(req, res) {
	if (req.params && req.params.spiffid){
		Spiff
			.findById(req.params.spiffid)
			.exec(function(err, spiff){
				if(!spiff){
					sendJsonResponse(res, 404, { "message" : "spiffid not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				var returnSpiff = {
					id : spiff._id,
					name : spiff.name,
					amount : spiff.amount
				}
				sendJsonResponse(res, 200, returnSpiff);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No spiffid in request."});
	}
};
module.exports.spiffsUpdateOne = function(req, res) {
	if(!req.params.spiffid){
		sendJsonResponse(res, 404, {
			"message": "Not found, spiffid is required"
		});
		return;
	}
	Spiff
		.findById(req.params.spiffid)
		.exec(
			function(err, spiff) {
				if(!spiff) {
					sendJsonResponse(res, 404, {
						"message" : "spiffid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				spiff.name = req.body.name;
				spiff.amount = req.body.amount;
				spiff.save(function(err, spiff){
					if (err) {
						sendJsonResponse(res, 404, err);
					} else {
						var returnSpiff = {
							id : spiff._id,
							name : spiff.name,
							amount : spiff.amount
						}
						sendJsonResponse(res, 200, returnSpiff);
					}
				});
			}
		);
};
module.exports.spiffsDeleteOne = function(req, res) {
	if (req.params.spiffid) {
		Spiff
			.findByIdAndRemove(req.params.spiffid)
			.exec(
				function(err, spiff){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 200, "Spiff successfully deleted!");
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No spiffid"
		});
	}
};