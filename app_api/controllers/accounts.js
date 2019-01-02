var mongoose = require('mongoose').set('debug', true);
var Account = mongoose.model('Account');
var moment = require('moment');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.accountsList = function(req, res) {
	Account
		.find()
		.exec(function(err, accounts){
			console.log(accounts);
			if(!accounts){
				sendJsonResponse(res, 404, { "message" : "no accounts found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, accounts);
		});
};
module.exports.accountsCreate = function(req, res) {
	console.log(req.body);
	var newaccount = new Account(req.body);
	newaccount.save(function(err, account) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res,200,account);
		}
	});
};
module.exports.accountsReadOne = function(req, res) {
	if (req.params && req.params.accountid){
		Account
			.findOne({_id : req.params.accountid})
			.exec(function(err, account){
				if(!account){
					sendJsonResponse(res, 404, { "message" : "account not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 409, err);
				}else{
					sendJsonResponse(res, 200, account);
				}
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No account id in request."});
	}
};
module.exports.accountsUpdateOne = function(req, res) {
	if(!req.params.accountid){
		sendJsonResponse(res, 404, {
			"message": "Not found, accountid is required"
		});
	}else{
		var account = req.body;
		Account.findOneAndUpdate({'_id':req.params.accountid}, account, function(err, account){
		    if (err){
		    	sendJsonResponse(res,400, err);
		    }else{
		    	Account.find().exec(function(err,accounts){
					if(!accounts){
						sendJsonResponse(res,404,{"message":"no accounts found"});
					}else if(err){
						sendJsonResponse(res,400,err);
					}else{
						sendJsonResponse(res,200,accounts);
					}
				})
		    }
		});
	}
};
module.exports.accountsDeleteOne = function(req, res) {
	if (req.params.accountid) {
		Account
			.findByIdAndRemove(req.params.accountid)
			.exec(
				function(err, account){
					if(err){
						sendJsonResponse(res, 400, err);
						return;
					}else{
				    	Account.find().exec(function(err,accounts){
							if(!accounts){
								sendJsonResponse(res,404,{"message":"no accounts found"});
							}else if(err){
								sendJsonResponse(res,400,err);
							}else{
								sendJsonResponse(res,200,"Account successfully deleted!");
							}
						})
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {"message" : "No accountid in the request"});
	}
};