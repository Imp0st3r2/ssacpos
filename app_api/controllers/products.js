var mongoose = require('mongoose').set('debug', true);
var Product = mongoose.model('Product');
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.productsList = function(req, res) {
	if (req.params){
		Product
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
module.exports.productsCreate = function(req, res) {
	console.log(req.body);
	var product = new Product(req.body);

	product.save(function(err) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 404, err);
		} else {
			sendJsonResponse(res, 200, product.brand + "-" + product.model + " successfully created");
		}
	});
};
module.exports.productsReadOne = function(req, res) {
	if (req.params && req.params.productid){
		Product
			.findById(req.params.productid)
			.exec(function(err, product){
				if(!product){
					sendJsonResponse(res, 404, { "message" : "productid not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, product);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No productid in request."});
	}
};
module.exports.productsByModel = function(req, res) {
	if (req.params && req.params.modelname){
		Product
			.find({model:req.params.modelname})
			.exec(function(err, product){
				if(!product){
					sendJsonResponse(res, 404, { "message" : "model not found"});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, product);
			});
	} else {
		sendJsonResponse(res, 404, { "message" : "No model in request."});
	}
};
module.exports.productsUpdateOne = function(req, res) {
	if(!req.params.productid){
		sendJsonResponse(res, 404, {
			"message": "Not found, productid is required"
		});
		return;
	}
	var product = {
		upc : req.body.upc,
		brand : req.body.brand,
		category : req.body.category,
		model : req.body.model,
		cost : req.body.cost,
		price : req.body.price,
		spiff : req.body.spiff,
		quantity : req.body.quantity,
		channels: req.body.channels,
		distortion : req.body.distortion,
		snratio : req.body.snratio,
		frequencyresponse : req.body.frequencyresponse,
		outputpower : req.body.outputpower,
		dimensionsh : req.body.dimensionsh,
		dimensionsw : req.body.dimensionsw,
		dimensionsl : req.body.dimensionsl,
		size : req.body.size,
		sensitivity : req.body.sensitivity,
		configuration : req.body.configuration,
		peakwatts : req.body.peakwatts,
		rmswatts : req.body.rmswatts,
		mountingdepth : req.body.mountingdepth,
		preouts : req.body.preouts,
		weight : req.body.weight,
		amperehours : req.body.amperehours,
		voltage : req.body.voltage,
		description: req.body.description,
		bluetooth : req.body.bluetooth,
		usb : req.body.usb,
		cdrrw : req.body.cdrrw,
		mp3 : req.body.mp3,
		wma : req.body.wma,
		wave : req.body.wave,
		builtinamp : req.body.builtinamp,
		_id : req.body._id
	};
	Product.findOneAndUpdate({'_id':req.body._id}, product, function(err, doc){
	    if (err) sendJsonResponse(res,500, { error: err });
	    sendJsonResponse(res,200,doc);
	});
};
module.exports.productsDeleteOne = function(req, res) {
	if (req.params.productid) {
		Product
			.findByIdAndRemove(req.params.productid)
			.exec(
				function(err, product){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 204, "Product successfully deleted!");
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No productid"
		});
	}
};

module.exports.getCategoriesByBrand = function(req,res){
	var brand = req.params.brand;

	if (brand){
		Product
			.find({"brand":brand})
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
		sendJsonResponse(res, 404, { "message" : "No brand in the request."});
	}

}