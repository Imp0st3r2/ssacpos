var mongoose = require('mongoose').set('debug', true);
var User = mongoose.model('User');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.usersListAll = function(req, res) {
	if (req.params){
		User
			.find()
			.exec(function(err, user){
				if(!user){
					sendJsonResponse(res, 404, { "message" : "no users found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, user);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No userid in request."});
	}
};
module.exports.usersCreate = function(req, res) {
	console.log(req);
	if(!req.body.name || !req.body.email || !req.body.password) {
		sendJsonResponse(res, 400, {"message": "All fields required"});
	return;
	}
	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;

	user.setPassword(req.body.password);
	if(req.body.status){
		user.status = req.body.status;
	}
	console.log(user);
	user.save(function(err) {
		if (err) {
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, user.name + "-" + user.status + " successfully created");
		}
	});
};
module.exports.usersReadOne = function(req, res) {
	if (req.params && req.params.userid){
		User
			.findById(req.params.userid)
			.exec(function(err, user){
				if(!user){
					sendJsonResponse(res, 404, { "message" : "userid not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				var returnUser = {
					id : user._id,
					name : user.name,
					email : user.email,
					status : user.status
				}
				sendJsonResponse(res, 200, returnUser);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No userid in request."});
	}
};
module.exports.usersUpdateOne = function(req, res) {
	if(!req.params.userid){
		sendJsonResponse(res, 404, {
			"message": "Not found, userid is required"
		});
		return;
	}
	User
		.findById(req.params.userid)
		.exec(
			function(err, user) {
				if(!user) {
					sendJsonResponse(res, 404, {
						"message" : "userid not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				user.name = req.body.name;
				user.email = req.body.email;
				user.status = req.body.status;
				user.save(function(err, user){
					if (err) {
						sendJsonResponse(res, 404, err);
					} else {
						var returnUser = {
							id : user._id,
							name : user.name,
							email : user.email,
							status : user.status
						}
						sendJsonResponse(res, 200, returnUser);
					}
				});
			}
		);
};
module.exports.usersChangePass = function(req, res) {
	console.log("CHANGING PASSWORD");
	User
		.findById(req.body.id)
		.exec(function(err, user){
			if(!user){
				sendJsonResponse(res, 404, { "message" : "userid not found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			console.log(user);
			var returnUser = user;
			returnUser.setPassword(req.body.password);
			console.log(returnUser);
			returnUser.save(function(err) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					var returnUser2 = {
						id : returnUser.id,
						name : returnUser.name,
						email : returnUser.email,
						status : returnUser.status
					}
					sendJsonResponse(res, 200, returnUser2);
				}
			});
		});

}
module.exports.usersDeleteOne = function(req, res) {
	if (req.params.userid) {
		User
			.findByIdAndRemove(req.params.userid)
			.exec(
				function(err, user){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 204, user);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No userid"
		});
	}
};