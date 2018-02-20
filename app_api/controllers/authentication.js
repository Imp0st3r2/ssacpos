var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONreponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {
	if(!req.body.name || !req.body.email || !req.body.password) {
		sendJSONreponse(res, 400, {"message": "All fields required"});
		return;
	}
	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.status = "User";
	
	user.save(function(err) {
		var token;
		if (err) {
			sendJSONreponse(res, 404, err);
		} else {
			token = user.generateJwt();
			console.log(token);
			sendJSONreponse(res, 200, { "token": token });
		}
	});
};

module.exports.login = function(req, res) {
	if(!req.body.email || !req.body.password) {
		sendJSONreponse(res, 400, { "message": "All fields required"});
		return;
	}

	passport.authenticate('local', function(err, user, info) {
		var token;

		if (err) {
			sendJSONreponse(res, 404, err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			sendJSONreponse(res, 200, { "token": token});
		} else {
			sendJSONreponse(res, 401, info);
		}
	}) (req, res);
};
