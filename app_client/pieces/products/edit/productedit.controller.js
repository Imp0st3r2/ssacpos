(function(){
angular
	.module('ssacpos')
	.controller('producteditCtrl', producteditCtrl);

producteditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'product'];

function producteditCtrl($location, $scope, $compile, authentication, product) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.products = {};
		vm.attr = {
			brand : true,
			category : true,
			model : true,
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
			peakWatts : 0,
			rmsWatts : 0,
			mountingdepth : 0,
			preouts : 0,
			weight : 0,
			amperehours : 0,
			voltage : 0,
			description: "",
			price : 0,
			bluetooth : false,
			usb : false,
			cdrrw : false,
			mp3 : false,
			wma : false,
			wave : false,
			builtinamp : false
		};
		vm.currentProduct = product.getProduct();
		vm.brands = [];
		vm.categories = [];
		console.log(vm.currentProduct);
		product.getProductById(vm.currentProduct.id).then(function(response2){
			console.log(response2);
			vm.newproduct = response2.data;
			console.log(vm.newproduct);
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
				vm.configureCategory(vm.newproduct.category.toLowerCase());
			})
		});
		$("#product-brand").on('change',function(){
			if($("#product-brand").val()==="newbrand"){
				vm.newbrand = true;
			}else{
				vm.newbrand = false;
			}
		});
		$("#product-newcategory").on('change',function(){
			for(attr in vm.attr){
				if(attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "size" && attr != "configuration" && attr != "description"){
					vm.attr[attr] = false;
				}
			};

			console.log(vm.attr);
			vm.configureCategory($("#product-newcategory").val().toLowerCase());

		});
		$("#product-category").on('change',function(){
			for(attr in vm.attr){
				if(attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "size" && attr != "configuration" && attr != "description"){
					vm.attr[attr] = false;
				}
			};

			console.log(vm.attr);
			vm.configureCategory($("#product-category").val().toLowerCase());
			if($("#product-category").val()==="newcategory"){
				vm.newcategory = true;
			}else{
				vm.newcategory = false;
			};
		});
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
			};
		};
		$("input[type=checkbox]").on('click',function(){
			if($(this).prop("checked")){
				var attributename = $(this).val();
				console.log(attributename);
				vm.newproduct[attributename] = true;
				console.log(vm.newproduct);
				// var appendString = "<div class='form-group' id='"+attributeProperty+"'>"
				// 				 + 		"<label for='"+attributeProperty+"'>Enter "+attributeName+": </label>"
				// 				 +		"<input class='form-control' type='text' name='"+attributeProperty+"' placeholder='Enter "+attributeName.toLowerCase()+" here.' ng-model='pvm.newProduct."+attributeName.toLowerCase()+"'>"
				// 				 +	"</div>";
				// $("#product-form").append(appendString);
			}else{
				var attributename = $(this).val();
				console.log(attributename);
				vm.newproduct[attributename] = false;
				console.log(vm.newproduct);
				// $("#"+attributeProperty).hide();
			};
		});
		vm.toggleAttributes = function(){
			$("#additional-attributes").slideToggle();
		}
		vm.submitProduct = function(){
			// vm.currentProduct = {};
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
							console.log(vm.newproduct);
							product.editProduct(vm.newproduct).then(function(response){
								$(".dialogbox").empty();
								var updatedproduct = response.data;
								var appendString = "<div class='row'>"
												 +  "<div class='col-xs-12'>"
												 + 	 "<p>"+updatedproduct.brand + " " + updatedproduct.model+" has been updated!</p>"
												 +	"</div>"
												 + "</div>"
												 + "<div class='row'>"
												 +	"<div class='col-xs-3'></div>"
												 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='pevm.showList();'>OK</button></div>"
												 +	"<div class='col-xs-3'></div>"; 
								var el = angular.element(appendString)
								$(".dialogbox").append(el);
								compiled = $compile(el);
								compiled($scope);
								console.log(response);
								$(".dialogbox").show();
							},function(err){
								message = "There was an error updating the product.";
								vm.formError = message;
							});
						}else{
							vm.formError = "Please enter a price for the current product.";
							console.log(vm.newUser);
						};
					}else{
						vm.formError = "Please enter a model for the current product.";
						console.log(vm.newUser);
					};
				}else{
					vm.formError = "Please enter a category for the current product."
					console.log(vm.newUser);
				};
			}else{
				vm.formError = "Please enter a brand for the current product.";
				console.log(vm.newUser);
			};
		};
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><products></products></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		};
	}else{
		$location.path('/home');
	};
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	};
};
})();