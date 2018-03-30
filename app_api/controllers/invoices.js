var mongoose = require('mongoose').set('debug', true);
var Invoice = mongoose.model('Invoice');
var Counter = mongoose.model('Counter');
var moment = require('moment');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.invoicesList = function(req, res) {
	if (req.params){
		Invoice
			.find()
			.exec(function(err, products){
				if(!products){
					sendJsonResponse(res, 404, { "message" : "no users found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, products);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No userid in request."});
	}
};
module.exports.invoicesCreate = function(req, res) {
	console.log(req.body);
	var newinvoice = new Invoice(req.body);
	Invoice.findOne({},{},{sort:{'datecreated': -1}}, function(err, invoice){
		if(err){
			console.log("error: " + err);
		}else{
			if(invoice === null){
				newinvoice.invoicenumber = 1;
			}else{
				console.log(invoice)
				newinvoice.invoicenumber = invoice.invoicenumber + 1;
			}
			newinvoice.save(function(err) {
				if (err) {
					console.log(err);
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, "Invoice successfully created");
				}
			});
		}
	})
};
function getNextSequenceValue(sequenceName){
	var sequenceDocument = Counter.findAndModify({
		query:{_id:sequenceName},
		update: {$inc:{sequence_value:1}},
		new:true
	});
	return sequenceDocument.sequence_value;
}
module.exports.invoicesReadOne = function(req, res) {
	if (req.params && req.params.invoiceid){
		Invoice
			.findOne({_id : req.params.invoiceid})
			.exec(function(err, invoice){
				if(!invoice){
					sendJsonResponse(res, 404, { "message" : "invoice not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, invoice);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No invoice id in request."});
	}
};
module.exports.invoicesUpdateOne = function(req, res) {
	if(!req.params.invoiceid){
		sendJsonResponse(res, 404, {
			"message": "Not found, productid is required"
		});
		return;
	}
	var invoice = req.body;
		Invoice.findOneAndUpdate({'_id':invoice._id}, invoice, function(err, doc){
		    if (err) sendJsonResponse(res,500, { error: err });
		    sendJsonResponse(res,200,"The invoice has been updated successfully!");
		});
};
module.exports.invoicesMarkedPaid = function(req,res){
	if(req.params.invoiceid){
		Invoice
			.findOne({_id : req.params.invoiceid})
			.exec(function(err,invoice){
				if(err){
					sendJsonResponse(res,400,{"message" : "Could not find the specified invoice."});
				}else{
					var datepaid = moment().format('YYYY-MM-DD').toString();
					console.log(datepaid);
					invoice.datepaid = datepaid;
					invoice.paid = true;
					invoice.save(function(err,invoice){
						console.log(invoice)
						if(err){
							sendJsonResponse(res,400,{"message" : "There was a problem updating the invoice"})
						}else{
							sendJsonResponse(res,200,invoice);
						}
					})
				}
			})
	}
}
module.exports.invoicesMakePayment = function(req,res){
	if(req.params.invoiceid){
		Invoice
			.findOne({_id : req.params.invoiceid})
			.exec(function(err,invoice){
				if(err){
					sendJsonResponse(res,400,{"message" : "Could not find the specified invoice."})
				}else{
					console.log(invoice);
					console.log(req.body);
					var payment = {
						amountpaid : req.body.amountpaid,
						dateofpayment : moment().format('YYYY-MM-DD').toString()
					}
					invoice.payments.push(payment);
					var paymenttotal = 0;
					for(var i =0;i<invoice.payments.length;i++){
						paymenttotal += invoice.payments[i].amountpaid;
					}
					invoice.totalafterpayments = Number((invoice.totalprice - paymenttotal).toFixed(2));
					invoice.save(function(err,invoice){
						console.log(invoice)
						if(err){
							sendJsonResponse(res,400,{"message" : "There was a problem updating the invoice."});
						}else{
							sendJsonResponse(res,200,invoice);
						}
					})
				}
			})
	}else{
		sendJsonResponse(res,400,{"message" : "No Invoice Id."});
	}
}
module.exports.invoicesDeleteOne = function(req, res) {
	if (req.params.invoiceid) {
		Invoice
			.findByIdAndRemove(req.params.invoiceid)
			.exec(
				function(err, invoice){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 204, invoice);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No productid"
		});
	}
};