var mongoose = require('mongoose').set('debug', true);
var Invoice = mongoose.model('Invoice');
var moment = require('moment');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.invoicesList = function(req, res) {
	Invoice
		.find()
		.exec(function(err, invoices){
			if(!invoices){
				sendJsonResponse(res, 404, { "message" : "no invoices found"});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, invoices);
		});
};
module.exports.invoicesByDateRange = function(req,res){
	var reportDates = req.body;
	if(reportDates){
		Invoice
			.find()
			.exec(function(err, invoices){
				if(!invoices){
					sendJsonResponse(res, 400, { "message" : "no invoices found"})
				} else if (err){
					sendJsonResponse(res, 400, err);
				}else{
					var splitstartdate = reportDates.startdate.split('-');
					var startyear = Number(splitstartdate[0]);
					var startmonth = Number(splitstartdate[1]);
					var startday = Number(splitstartdate[2]);
					console.log(startyear);
					console.log(startmonth);
					console.log(startday);
					var splitenddate = reportDates.enddate.split('-');
					var endyear = Number(splitenddate[0]);
					var endmonth = Number(splitenddate[1]);
					var endday = Number(splitenddate[2]);
					console.log(endyear);
					console.log(endmonth);
					console.log(endday);
					var filteredInvoices = [];
					for(var i=0;i<invoices.length;i++){
						var splitinvoicedate = invoices[i].datecreated.split('-');
						var invoiceyear = Number(splitinvoicedate[0]);
						var invoicemonth = Number(splitinvoicedate[1]);
						var invoiceday = Number(splitinvoicedate[2]);
						console.log(invoiceyear);
						console.log(invoicemonth);
						console.log(invoiceday);
						if(invoiceyear >= startyear && invoiceyear <= endyear && invoicemonth >= startmonth && invoicemonth <= endmonth && invoiceday >= startday && invoiceday <= endday){
							filteredInvoices.push(invoices[i]);
						}
					}
					sendJsonResponse(res, 200, filteredInvoices);
				}
			})
	}else{
		sendJsonResponse(res, 404, {"message" : "No date range in request"});
	}
}
module.exports.invoicesCreate = function(req, res) {
	console.log(req.body);
	var invoice = new Invoice(req.body);
	invoice.datecreated = moment().format('YYYY-MM-DD').toString();
	invoice.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, "Invoice successfully created");
		}
	});
};
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