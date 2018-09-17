(function(){
angular
	.module('ssacpos')
	.controller('productcreateCtrl', productcreateCtrl);

productcreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'product'];

function productcreateCtrl($location, $scope, $compile, authentication, product) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.products = {};
		vm.attr = {
			spiff : true,
			upc : true,
			brand : true,
			category : true,
			model : true,
			cost : true,
			price : true,
			quantity : true,
			channels : false,
			distortion : false,
			snratio : false,
			frequencyresponse : false,
			outputpower : false,
			dimensions : false,
			size : true,
			sensitivity : false,
			configuration : true,
			wattage : false,
			mountingdepth : false,
			preouts : false,
			weight :false,
			amphours : false,
			voltage : false,
			description : true
		}
		vm.newproduct = {
			spiff : 0,
			upc : "",
			brand : "",
			newbrand : "",
			category : "",
			newcategory : "",
			model : "",
			quantity : 0,
			channels : 0,
			distortion : 0,
			snratio : 0,
			frequencyresponse : 0,
			outputpower : 0,
			dimensionsh : 0,
			dimensionsw : 0,
			dimensionsl : 0,
			size : "",
			sensitivity : 0,
			configuration : "",
			peakwatts : 0,
			rmswatts : 0,
			mountingdepth : 0,
			preouts : 0,
			weight : 0,
			amperehours : 0,
			voltage : 0,
			description: "",
			cost : 0,
			price : 0,
			bluetooth : false,
			usb : false,
			cdrrw : false,
			mp3 : false,
			wma : false,
			wav : false,
			builtinamp : false
		};

		$(document).on('keydown', function(e) {
    		// console.log("key pressed");
    		if (e.which == 13) {
        		e.preventDefault();
    		}
		});
		vm.brands = [];
		vm.categories = [];
		console.log(vm.currentProduct);
		product.getProductList().then(function(response){
			vm.products = response.data;
			for(pitem in vm.products){
				foundBrand = 0;
				foundCategory = 0;
				for(var i=0;i<vm.brands.length;i++){
					if(vm.brands[i] === vm.products[pitem].brand){
						foundBrand = 1;
					}
				}
				for(var i=0;i<vm.categories.length;i++){
					if(vm.categories[i] === vm.products[pitem].category){
						foundCategory = 1;
					}
				}
				if(foundBrand === 0){
					vm.brands.push(vm.products[pitem].brand);
				}
				if(foundCategory === 0){
					vm.categories.push(vm.products[pitem].category);
				}
			}
			console.log(vm.brands);
			console.log(vm.categories);
		})
		$("#product-brand").on('change',function(){
			if($("#product-brand").val()==="newbrand"){
				vm.newbrand = true;
			}else{
				vm.newbrand = false;
			}
		})
		$("#product-newcategory").on('change',function(){
			for(attr in vm.attr){
				if(attr != "upc" && attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "cost" && attr != "spiff" && attr != "size" && attr != "configuration" && attr != "description"){
					vm.attr[attr] = false;
				}
			}
			console.log(vm.attr);
			var cat = $("#product-newcategory").val();
			cat = cat.toLowerCase().replace(' ','')
			console.log(cat);
			vm.configureCategory(cat);
		})
		$("#product-category").on('change',function(){
			for(attr in vm.attr){
				if(attr != "upc" && attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "cost" && attr != "spiff" && attr != "size" && attr != "configuration" && attr != "description"){
					vm.attr[attr] = false;
				}
			}

			console.log(vm.attr);
			var cat = $("#product-category").val().toLowerCase().replace(' ','');
			cat = cat.toLowerCase().replace(' ','')
			console.log(cat);
			vm.configureCategory(cat);
			if($("#product-category").val()==="newcategory"){
				vm.newcategory = true;
			}else{
				vm.newcategory = false;
			}
		})
		$("input[type=checkbox]").on('click',function(){
			if($(this).prop("checked")){
				var attributename = $(this).val();
				console.log(attributename);
				vm.newproduct[attributename] = true;
				console.log(vm.newproduct);
			}else{
				var attributename = $(this).val();
				console.log(attributename);
				vm.newproduct[attributename] = false;
				console.log(vm.newproduct);
				// $("#"+attributeProperty).hide();
			}
		})
		vm.configureCategory = function(category){
			switch(category){
				case "amps":
					vm.attr.quantity = true;
					vm.attr.channels = true;
					vm.attr.distortion = true;
					vm.attr.snratio = true;
					vm.attr.frequencyresponse = true;
					vm.attr.dimensions = true;
					vm.attr.outputpower = true;
					vm.attr.size = false;
					vm.attr.configuration = false;
					break;
				case "speakers":
					vm.attr.quantity = true;
					vm.attr.size = true;
					vm.attr.sensitivity = true;
					vm.attr.frequencyresponse = true;
					vm.attr.configuration = true;
					vm.attr.wattage = true;
					break;
				case "subwoofers":
					vm.attr.quantity = true;
					vm.attr.size = true;
					vm.attr.sensitivity = true;
					vm.attr.frequencyresponse = true;
					vm.attr.mountingdepth = true;
					vm.attr.wattage = true;
					break;
				case "cbradios":
					vm.attr.quantity = true;
					vm.attr.dimensions = true;
					vm.attr.size = false;
					vm.attr.configuration = false;
					break;
				case "cdplayers":
					vm.attr.quantity = true;
					vm.attr.preouts = true;
					vm.attr.configuration = true;
					vm.attr.size = false;
					break;
				case "dvdplayers":
					vm.attr.quantity = true;
					vm.attr.preouts = true;
					vm.attr.configuration = true;
					vm.attr.size = false;
					break;
				case "navunits":
					vm.attr.quantity = true;
					vm.attr.preouts = true;
					vm.attr.configuration = true;
					vm.attr.size = false;
					break;
				case "powercells":
					vm.attr.quantity = true;
					vm.attr.weight = true;
					vm.attr.amphours = true;
					vm.attr.wattage = true;
					vm.attr.dimensions = true;
					vm.attr.voltage = true;
					vm.attr.size = false;
					vm.attr.configuration = false;
					break;
				case "boxes":
					vm.attr.quantity = true;
					vm.attr.size = true;
					vm.attr.configuration = true;
					vm.attr.dimensions = true;
					break;
				case "accessories":
					vm.attr.quantity = true;
					vm.attr.configuration = true;
					vm.attr.dimensions = true;
					vm.attr.size = false;
					break;
				case "hgbulbs":
					vm.attr.quantity = true;
					vm.attr.configuration = true;
					vm.attr.dimensions = true;
					vm.attr.size = false;
					break;
				case "ledbulbs":
					vm.attr.quantity = true;
					vm.attr.configuration = true;
					vm.attr.dimensions = true;
					vm.attr.size = false;
					break;
				default:
					console.log("Case: "+category+" needs configuration.");
					vm.attr.upc = true;
					vm.attr.brand = true;
					vm.attr.category = true;
					vm.attr.model = true;
					vm.attr.cost = true;
					vm.attr.price = true;
					vm.attr.spiff = true;
					vm.attr.quantity = true;
					vm.attr.channels = true;
					vm.attr.distortion = true;
					vm.attr.snratio = true;
					vm.attr.frequencyresponse = true;
					vm.attr.outputpower = true;
					vm.attr.dimensions = true;
					vm.attr.size = true;
					vm.attr.sensitivity = true;
					vm.attr.configuration = true;
					vm.attr.wattage = true;
					vm.attr.mountingdepth = true;
					vm.attr.preouts = true;
					vm.attr.weight = true;
					vm.attr.amphours = true;
					vm.attr.voltage = true;
					vm.attr.description = true;
			}
		}
		vm.toggleAttributes = function(){
			$("#additional-attributes").slideToggle();
		}
		vm.submitProduct = function(){
			vm.currentProduct = {};
			if(vm.newproduct.brand != ""){
				if(vm.newproduct.newbrand){
					if(vm.newproduct.newbrand != ""){
						vm.newproduct.brand = vm.newproduct.newbrand; 
					}
				}
				if(vm.newproduct.category != ""){
					if(vm.newproduct.newcategory){
						if(vm.newproduct.newcategory != ""){
							vm.newproduct.category = vm.newproduct.newcategory;
						}
					}
					if(vm.newproduct.model != ""){
						if(vm.newproduct.price != ""){
							if(vm.newproduct.cost != ""){
								console.log(vm.newproduct);
								product.createProduct(vm.newproduct).then(function(response){
									$(".dialogbox").empty();
									var appendString = "<div class='row'>"
													 +  "<div class='col-xs-12'>"
													 + 	 "<p>"+response.data+"</p>"
													 +	"</div>"
													 + "</div>"
													 + "<div class='row'>"
													 +	"<div class='col-xs-3'></div>"
													 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='pvm.showList();'>OK</button></div>"
													 +	"<div class='col-xs-3'></div>"; 
									var el = angular.element(appendString)
									$(".dialogbox").append(el);
									compiled = $compile(el);
									compiled($scope);
									console.log(response);
									$(".dialogbox").show();
								},function(err){
									message = "There was an error creating the product.";
									vm.formError = message;
								})
							}else{
								vm.formError = "Please enter a cost for the current product";
							}
						}else{
							vm.formError = "Please enter a price for the current product.";
							console.log(vm.formError);
						}
					}else{
						vm.formError = "Please enter a model for the current product.";
						console.log(vm.formError);
					}
				}else{
					vm.formError = "Please enter a category for the current product."
					console.log(vm.formError);
				}
			}else{
				vm.formError = "Please enter a brand for the current product.";
				console.log(vm.formError);
			}
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><products></products></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();