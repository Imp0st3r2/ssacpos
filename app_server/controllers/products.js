
/*GET products options page*/
module.exports.index = function(req,res){
	res.render('product-options', {
		header0 : "Product Options",
		header1 : "Brands",
		header2 : "Categories",
		option1 : {
			"Memphis" : "/products/brands/",
			"Rockford" : "/products/brands/",
			"Hertz" : "/products/brands/",
			"Pioneer" : "/products/brands/",
			"Kinetik" : "/products/brands/",
			"JVC" : "/products/brands/",
			"Audison" : "/products/brands/",
			"RT Boxes" : "/products/brands/",
			"Metra" : "/products/brands/",
			"Kenwood" : "/products/brands/",
			"PAC Audio" : "/products/brands/",
			"DD Digital Audio" : "/products/brands/",
			"DC Power Inc" : "/products/brands/"
		},
		option2 : {
			"Amplifiers" : "/products/categories/",
			"Speakers" : "/products/categories/",
			"Subwoofers" : "/products/categories/",
			"Players" : "/products/categories/",
			"Boxes" : "/products/categories/",
			"Power" : "/products/categories/",
			"CB Radios" : "/products/categories/",
			"Lighting" : "/products/categories/",
			"Accessories" : "/products/categories/"
		},
		options : {
			'Create Products' : '/products/create/',
			'Back' : '/dashboard/'
		}
	});
}
module.exports.create = function(req,res){
	res.render('product-create', {
		header0: "Create New Product",
		header1: "Product Form",
		options : {
			'Submit' : '/dashboard/',
			'Back' : '/dashboard/'
		}
	})
}

module.exports.edit = function(req,res){
	res.render('product-edit', {
		header0: "Edit Product",
		header1: "Edit Form",
		options : {
			'Submit' : '/dashboard/',
			'Back' : '/dashboard/'
		}
	})
}
module.exports.brands = function(req,res){
	res.render('product-brands', {
		header0 : "Memphis",
		header1 : "Categories",
		header2 : "",
		option1 : {
			"Amplifiers" : "/products/brands/categories/",
			"Speakers" : "/products/brands/categories/",
			"Subwoofers" : "/products/brands/categories/"
		},
		option2 : {
			products: []
		},
		options : {
			'Create Products' : '/products/create/',
			'Back' : '/products/'
		}
	})
}
module.exports.categories = function(req,res){
	res.render('product-categories', {
		header0 : "All-Amplifiers",
		header1 : "Amplifiers",
		header2 : "Product Info",
		option1 : {
			"Addictive Audio" : ["50.1D","100.1D","20.2AB"],
			"Audison" : ["SR1DK","SR1D","SR2","SR4"],
			"Digital Designs" : ["A2","A4","A5","AM1","M.45","M.80","M1c","M2b","M3b","M4","M4a"],
			"Hertz" : ["HDP1","HE2","HE1D","HE4","HDP4","HDP5","HCP2","HCP4","HCP1D"],
			"Kenwood" : ["X450-4","X500-1","KAC-8405","KAC-9105D","KAC-8105D"],
			"Memphis" : ["16-SRX1.250","16-SRX2.150","16-MM4.480","16-MM5.75","16-PRX2.100","16-PRX4.50","16-PRX5.550","16-PRX1.500","16-PRX1.1000"],
			"Rockford" : ["T1000-1bdCP","T600-2","PBR300X4","T500-1bdCP","P700-1BD","T400-4","T500-1bd","PBR300X1","R150X2","R250X1","R250X4","T500X1br","T400X2ad","T400X4ad","RFBTRCA"]
		},
		option2 : {
			"Edit" : "/products/product/edit",
			"Delete" : "/products/product/delete"
		},
		productInfo : {
			"Name: " : "50.1D",
			"Channels: " : "1",
			"Distortion: " : "0.5%",
			"S/N Ratio: " : "95dB",
			"Frequency Response: " : "N/A",
			"Dimensions: " : "8.5in W x 2.38in H x 12.75in L",
			"Output Power: " : "250x1@4ohms 435x1@2ohms 695x1@1ohm",
			"Quantity: " : "3"
		},
		options : {
			'Create Products' : '/products/create/',
			'Back' : '/products/'
		}
	})
}
module.exports.categoriesByBrand = function(req,res){
	res.render('product-categories', {
		header0 : "Memphis-Amplifiers",
		header1 : "Amplifiers",
		header2 : "Product Info",
		option1 : {
			"Memphis" : ["16-SRX1.250","16-SRX2.150","16-MM4.480","16-MM5.75","16-PRX2.100","16-PRX4.50","16-PRX5.550","16-PRX1.500","16-PRX1.1000"],
		},
		option2 : {
			"Edit" : "/products/product/edit",
			"Delete" : "/products/"
		},
		productInfo : {
			"Name: " : "16-SRX1.250",
			"Channels: " : "1",
			"Distortion: " : "0.5%",
			"S/N Ratio: " : "N/A",
			"Frequency Response: " : "20-250Hz",
			"Dimensions: " : "10.43in W x 2.28in H x 10.83in L",
			"Output Power: " : "150x1@4ohms 250x1@2ohms",
			"Quantity: " : "3"
		},
		options : {
			'Create Products' : '/products/create/',
			"Amplifiers" : "/products/brands/categories",
			"Speakers" : "/products/brands/categories",
			"Subwoofers" : "/products/brands/categories",
			"Players" : "/products/brands/categories",
			"Boxes" : "/products/brands/categories",
			"Power" : "/products/brands/categories",
			"CB Radios" : "/products/brands/categories",
			"Lighting" : "/products/brands/categories",
			"Accessories" : "/products/brands/categories",
			'Back' : '/products/'
		}
	})
}