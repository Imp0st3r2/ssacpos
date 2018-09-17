(function(){
angular
	.module('ssacpos')
	.controller('invoiceeditCtrl', invoiceeditCtrl);

invoiceeditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'invoice', 'product', 'spiff', 'tax'];

function invoiceeditCtrl($location, $scope, $compile, authentication, invoice, product, spiff, tax) {
	$(document).on('keydown', function(e) {
		// console.log("key pressed");
		if (e.which == 13) {
			e.preventDefault();
		}
	});
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentUser = authentication.currentUser();
	if(vm.isLoggedIn){
		vm.invoices = [];
		vm.newinvoice = {
			account : {},
			vehiclemake : "",
			vehiclemodel : "",
			vehicleyear : "",
			vehiclelicense : "",
			vehiclevin : "",
			salesrep : vm.currentUser.name,
			items : [],
			labors : [],
			others : [],
			laborcharges : 0,
			itemcharges : 0,
			spiffs : [],
			spifftotal : 0,
			taxrate : 0,
			taxdue : 0,
			othercharges : 0,
			totalprice : 0,
			totalcost : 0,
			totalafterpayments : 0,
			paid: false,
			datepaid : null
		};
		vm.currentInvoice = invoice.getInvoice();
		console.log(vm.currentInvoice);
		vm.itemCount = 0;
		vm.invoiceItems = [];
		vm.laborCount = 0;
		vm.invoiceLabors = [];
		vm.otherCount = 0;
		vm.invoiceOthers = [];
		vm.spiffCount = 0;
		vm.invoiceSpiffs = [];
		vm.products = [];
		vm.brands = [];
		vm.categories = [];
		vm.models = [];
		vm.taxchange = false;
		tax.getTaxRate().then(function(response){
			vm.taxrate = Number(response.data);
			console.log(vm.newinvoice.taxrate);
			spiff.getSpiffs().then(function(response){
				vm.spiffs = response.data;
				console.log(vm.spiffs);
			})
			invoice.getInvoiceById(vm.currentInvoice.id).then(function(response2){
				console.log(response2);
				vm.newinvoice = response2.data;
				console.log(vm.newinvoice);
				if(vm.taxrate != vm.newinvoice.taxrate){
					vm.taxchange = true;
					vm.newinvoice.taxrate = vm.taxrate;
					vm.calculateTax();
					vm.calcTotalPrice();
				}
				product.getProductList().then(function(response){
					console.log(response.data);
					vm.products = response.data;
					console.log(vm.products);
					for(p in vm.products){
						console.log(p);
						if(vm.models.indexOf(vm.products[p].model) === -1){
							vm.models.push(vm.products[p].model);
						}
					}
					console.log(vm.brands);
					for(var i=0;i<vm.newinvoice.items.length;i++){
						var appendString = "";
						if(vm.newinvoice.items[i]){
							vm.invoiceItems.push(vm.newinvoice.items[i]);
							appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='item"+vm.itemCount+"'>"
														+ 	"<div class='row' style='text-align:center;'>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Delete</p>"
													 	+			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.itemCount+");'>X</button>"
													 	+		"</div>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Quantity</p>"
													 	+			"<input type='number' class='form-control itemquantity' id='item"+vm.itemCount+"-quantity' name='item"+vm.itemCount+"-quantity' min='0' max='ivm.newinvoice.items["+vm.itemCount+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.itemCount+"].quantity' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Model</p>"
													 	+			"<select class='form-control itemmodel' id='item"+vm.itemCount+"-model' name='item"+vm.itemCount+"-model' ng-model='ivm.newinvoice.items["+vm.itemCount+"].model' ng-change='ivm.determineQuanPrice("+vm.itemCount+");'>"
													 	+				"<option ng-repeat='model in ivm.models"+vm.itemCount+"' value='{{model}}'>{{model}}</option>"
													 	+			"</select>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Brand</p>"
										 				+			"<input class='form-control itembrand' id='item"+vm.itemCount+"-brand' name='item"+vm.itemCount+"-brand' ng-model='ivm.newinvoice.items["+vm.itemCount+"].brand' ng-change='ivm.determineCategories("+vm.itemCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Category</p>"
										 				+			"<input class='form-control itemcategory' id='item"+vm.itemCount+"-category' name='item"+vm.itemCount+"-category' ng-model='ivm.newinvoice.items["+vm.itemCount+"].category' ng-change='ivm.determineModels("+vm.itemCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Unit Price</p>"
										 				+			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.itemCount+"-unitprice' name='item"+vm.itemCount+"-unitprice' ng-model='ivm.newinvoice.items["+vm.itemCount+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Spiff Amount</p>"
										 				+			"<input type='number' step='.01' class='form-control itemspiffamount' id='item"+vm.itemCount+"-spiffamount' name='item"+vm.itemCount+"-spiffamount' ng-model='ivm.newinvoice.items["+vm.itemCount+"].spiffamount'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Total Price</p>"
										 				+			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.itemCount+"-totalcharge' name='item"+vm.itemCount+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.itemCount+"].totalcharge' disabled>"
														+		"</div>"
														+	"</div>"
														+ "</div>";
							var el = angular.element(appendString);
							$("#item-group").append(el);
							compiled = $compile(el);
							compiled($scope);
							vm.determineCategories(vm.itemCount);
							vm.determineModels(vm.itemCount);
							vm.itemCount++;
						};
					};
					vm.newinvoice.items = vm.invoiceItems;
					for(var i=0;i<vm.newinvoice.labors.length;i++){
						var appendString = "";
						if(vm.newinvoice.labors[i]){
							vm.newinvoice.labors[i].time = Number(vm.newinvoice.labors[i].time);
							vm.newinvoice.labors[i].hourlycharge = Number(vm.newinvoice.labors[i].hourlycharge);
							vm.newinvoice.labors[i].totalcharge = Number(vm.newinvoice.labors[i].totalcharge);
							vm.invoiceLabors.push(vm.newinvoice.labors[i]);
							appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='labor"+vm.laborCount+"'>"
														+ 	"<div class='row' style='text-align:center;'>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Delete</p>"
								 						+			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.laborCount+");'>X</button>"
								 						+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Time (hrs)</p>"
								 						+			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.laborCount+"-time' name='labor"+vm.laborCount+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-5'>"
														+			"<p>Description</p>"
								 						+			"<input type='text' class='form-control labordescription' id='labor"+vm.laborCount+"-description' name='labor"+vm.laborCount+"-description' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].description'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Hourly Charge</p>"
								 						+			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.laborCount+"-hourlycharge' name='labor"+vm.laborCount+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Total Charge</p>"
								 						+			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.laborCount+"-totalcharge' name='labor"+vm.laborCount+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].totalcharge'>"
														+		"</div>"
														+	"</div>"
														+ "</div>";
							var el = angular.element(appendString);
							$("#labor-group").append(el);
							compiled = $compile(el);
							compiled($scope);
							vm.laborCount++;
						};
					};
					vm.newinvoice.labors = vm.invoiceLabors;
					for(var i=0;i<vm.newinvoice.others.length;i++){
						vm.invoiceOthers.push(vm.newinvoice.others[i]);
						var appendString = "";
						if(vm.newinvoice.others[i]){
							appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='other"+vm.otherCount+"'>"
														+ 	"<div class='row' style='text-align:center;'>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Delete</p>"
									 					+			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.otherCount+");'>X</button>"
									 					+		"</div>"
														+		"<div class='col-xs-12 col-md-9'>"
														+			"<p>Description</p>"
									 					+			"<input type='text' class='form-control otherdescription' id='other"+vm.otherCount+"-description' name='other"+vm.otherCount+"-description' ng-model='ivm.newinvoice.others["+vm.otherCount+"].description'>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Total Charge</p>"
									 					+			"<input type='number' step='.01' class='form-control labortotalcharge' id='other"+vm.otherCount+"-totalcharge' name='other"+vm.otherCount+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.otherCount+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.otherCount+");'>"
														+		"</div>"
														+	"</div>"
														+ "</div>";
							var el = angular.element(appendString);
							$("#other-group").append(el);
							compiled = $compile(el);
							compiled($scope);
							vm.otherCount++;
						};
					};
					vm.newinvoice.others = vm.invoiceOthers;
					for(var i=0;i<vm.newinvoice.spiffs.length;i++){
						var appendString = "";
						if(vm.newinvoice.spiffs[i]){
							vm.invoiceSpiffs.push(vm.newinvoice.spiffs[i]);
							appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='spiff"+vm.spiffCount+"'>"
														+ 	"<div class='row' style='text-align:center;'>"
														+		"<div class='col-xs-12 col-md-1'>"
														+			"<p>Delete</p>"
								 						+			"<button class='btn btn-danger' ng-click='ivm.deleteSpiff("+vm.spiffCount+");'>X</button>"
								 						+		"</div>"
														+		"<div class='col-xs-12 col-md-9'>"
														+			"<p>Name</p>"
								 						+			"<select class='form-control spiffname' id='spiff"+vm.spiffCount+"-name' name='spiff"+vm.spiffCount+"-name' ng-model='ivm.newinvoice.spiffs["+vm.spiffCount+"].name' ng-change='ivm.totalSpiffs("+vm.spiffCount+");'>"
							 							+				"<option ng-repeat='spiff in ivm.invoiceSpiffs' value='{{spiff.name}}'>{{spiff.name}}</option>"
								 						+			"</select>"
														+		"</div>"
														+		"<div class='col-xs-12 col-md-2'>"
														+			"<p>Amount</p>"
								 						+			"<input type='number' step='.01' class='form-control spiffamount' id='spiff"+vm.spiffCount+"-amount' name='spiff"+vm.spiffCount+"-amount' ng-model='ivm.newinvoice.spiffs["+vm.spiffCount+"].amount'>"
														+		"</div>"
														+	"</div>"
														+	"</div>";
							var el = angular.element(appendString);
							$("#spiff-group").append(el);
							compiled = $compile(el);
							compiled($scope);
							console.log(vm.spiffCount);
							vm.spiffCount++;
						}
					}
					vm.newinvoice.spiffs = vm.invoiceSpiffs;
				});
			});
		})
		
		console.log(vm.invoiceItems);
		console.log(vm.invoiceLabors);
		console.log(vm.invoiceOthers);
		$("input[type=checkbox]").on('click',function(){
			if($(this).prop("checked")){
				vm.newinvoice.taxdue = 0;
				vm.calcTotalPrice();
			}else{
				vm.calculateTax();
				vm.calcTotalPrice();
			}
		})
		vm.deleteSpiff = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.spiffs);
			$("#spiff"+itemnumber).remove();
			console.log(vm.newinvoice.spiffs[itemnumber].amount);
			vm.newinvoice.spifftotal -= vm.newinvoice.spiffs[itemnumber].amount;
			vm.newinvoice.spiffs[itemnumber] = null;
			var found = 0;
			for(var i=0;i<vm.newinvoice.spiffs.length;i++){
				if(vm.newinvoice.spiffs[i] != null){
					found = 1;
				}
			}
			if(found == 0){
				vm.newinvoice.spiffs = [];
				vm.invoiceSpiffs = [];
			}
			vm.spiffCount--;
			if(vm.spiffCount == 0){
				$("#spiff-group").empty();
				var appendString = "<span>Spiffs</span><br>";
				var el = angular.element(appendString);
				$("#spiff-group").append(el);
				compiled = $compile(el);
				compiled($scope);
			}
			console.log(vm.newinvoice.spifftotal);
		}
		vm.totalSpiffs = function(itemnumber){
			console.log(vm.newinvoice.spiffs);
			console.log(vm.newinvoice.spifftotal);
			for(var i=0;i<vm.spiffs.length;i++){
				console.log(vm.spiffs[i]);
				if(vm.spiffs[i].name === vm.newinvoice.spiffs[itemnumber].name){
					vm.newinvoice.spiffs[itemnumber].amount = vm.spiffs[i].amount;
				}
			}
			vm.newinvoice.spifftotal += vm.newinvoice.spiffs[itemnumber].amount;
			console.log(vm.newinvoice.spifftotal);
		}
		vm.submitInvoice = function(){
			console.log(vm.newinvoice);
			invoice.editInvoice(vm.newinvoice).then(function(response){
				console.log(response);
				$(".dialogbox").empty();
				var appendString = "<div class='row'>"
								 +  "<div class='col-xs-12'>"
								 + 	 "<p>"+response.data+"</p>"
								 +	"</div>"
								 + "</div>"
								 + "<div class='row'>"
								 +	"<div class='col-xs-3'></div>"
								 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.showList();'>OK</button></div>"
								 +	"<div class='col-xs-3'></div>"; 
				var el = angular.element(appendString)
				$(".dialogbox").append(el);
				compiled = $compile(el);
				compiled($scope);
				$(".dialogbox").show();
			})
		}
		vm.addSpiff = function(){
			var appendString = "";
			vm.newinvoice.spiffs[vm.spiffCount] = {
				name : "",
				amount : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='spiff"+vm.spiffCount+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteSpiff("+vm.spiffCount+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-9'>"
										+			"<p>Name</p>"
							 			+			"<select class='form-control spiffname' id='spiff"+vm.spiffCount+"-name' name='spiff"+vm.spiffCount+"-name' ng-model='ivm.newinvoice.spiffs["+vm.spiffCount+"].name' ng-change='ivm.totalSpiffs("+vm.spiffCount+");'>"
							 			+				"<option ng-repeat='spiff in ivm.spiffs' value='{{spiff.name}}'>{{spiff.name}}</option>"
							 			+			"</select>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Amount</p>"
							 			+			"<input type='number' step='.01' class='form-control spiffamount' id='spiff"+vm.spiffCount+"-amount' name='spiff"+vm.spiffCount+"-amount' ng-model='ivm.newinvoice.spiffs["+vm.spiffCount+"].amount'>"
										+		"</div>"
										+	"</div>"
										+	"</div>";
			var el = angular.element(appendString);
			$("#spiff-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.spiffCount++;
		}
		vm.addOther = function(){
			var appendString = "";
			vm.newinvoice.others[vm.otherCount] = {
				description : "",
				totalcharge : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='other"+vm.otherCount+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.otherCount+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-9'>"
										+			"<p>Description</p>"
							 			+			"<input type='text' class='form-control otherdescription' id='other"+vm.otherCount+"-description' name='other"+vm.otherCount+"-description' ng-model='ivm.newinvoice.others["+vm.otherCount+"].description'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Charge</p>"
							 			+			"<input type='number' step='.01' class='form-control labortotalcharge' id='other"+vm.otherCount+"-totalcharge' name='other"+vm.otherCount+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.otherCount+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.otherCount+");'>"
										+		"</div>"
										+	"</div>"
										+ "</div>";
			var el = angular.element(appendString);
			$("#other-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.otherCount++;
		}
		vm.deleteOther = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.others);
			$("#other"+itemnumber).remove();
			vm.newinvoice.othercharges -= vm.newinvoice.others[itemnumber].totalcharge;
			vm.newinvoice.others[itemnumber] = null;
			var found = 0;
			for(var i=0;i<vm.newinvoice.others.length;i++){
				if(vm.newinvoice.others[i] != null){
					found = 1;
				}
			}
			if(found == 0){
				vm.newinvoice.others = [];
			}
			vm.otherCount--;
			console.log(vm.otherCount);
			if(vm.otherCount == 0){
				$("#other-group").empty();
				var appendString = "<span>Other Charges</span><br>";
				var el = angular.element(appendString);
				$("#other-group").append(el);
				compiled = $compile(el);
				compiled($scope);
			}
			vm.calcTotalPrice();
		}
		vm.determineTotalOtherCharge = function(othernumber){
			var totalOtherCharge = 0;
			if(vm.newinvoice.others[othernumber].totalcharge > 0){
				for(var i=0;i<vm.newinvoice.others.length;i++){
					if(vm.newinvoice.others[i]){
						totalOtherCharge += vm.newinvoice.others[i].totalcharge;
					}
				}
				vm.newinvoice.othercharges = totalOtherCharge;
			vm.calcTotalPrice();
			}
		}
		vm.addLabor = function(){
			var appendString = "";
			vm.newinvoice.labors[vm.laborCount] = {
				time : 0,
				description : "",
				hourlycharge : 0,
				totalcharge : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='labor"+vm.laborCount+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.laborCount+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Time (hrs)</p>"
							 			+			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.laborCount+"-time' name='labor"+vm.laborCount+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-5'>"
										+			"<p>Description</p>"
							 			+			"<input type='text' class='form-control labordescription' id='labor"+vm.laborCount+"-description' name='labor"+vm.laborCount+"-description' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].description'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Hourly Charge</p>"
							 			+			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.laborCount+"-hourlycharge' name='labor"+vm.laborCount+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Charge</p>"
						 				+			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.laborCount+"-totalcharge' name='labor"+vm.laborCount+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].totalcharge'>"
										+		"</div>"
										+	"</div>"
										+ "</div>";
			var el = angular.element(appendString);
			$("#labor-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.laborCount++;
		}
		vm.deleteLabor = function(itemnumber){
			$("#labor"+itemnumber).remove();
			vm.newinvoice.laborcharges -= vm.newinvoice.labors[itemnumber].totalcharge;
			vm.newinvoice.labors[itemnumber] = null;
			var found = 0;
			for(var i=0;i<vm.newinvoice.labors.length;i++){
				if(vm.newinvoice.labors[i] != null){
					found = 1;
				}
			}
			if(found == 0){
				vm.newinvoice.labors = [];
			}
			vm.laborCount--;
			if(vm.laborCount === 0){
				$("#labor-group").empty();
				var appendString = "<span>Labor Charges</span><br>";
				var el = angular.element(appendString);
				$("#labor-group").append(el);
				compiled = $compile(el);
				compiled($scope);
			}
			vm.calcTotalPrice();
		}
		vm.determineTotalLaborCharge = function(labornumber){
			var totalLaborCharges = 0;
			console.log(labornumber);
			console.log(vm.newinvoice.labors[labornumber].time);
			console.log(vm.newinvoice.labors[labornumber].hourlycharge);
			if(vm.newinvoice.labors[labornumber].time > 0 && vm.newinvoice.labors[labornumber].hourlycharge > 0){
				vm.newinvoice.labors[labornumber].totalcharge = vm.newinvoice.labors[labornumber].time * vm.newinvoice.labors[labornumber].hourlycharge;
				console.log(vm.newinvoice.labors);
				for(var i=0;i<vm.newinvoice.labors.length;i++){
					if(vm.newinvoice.labors[i]){
						totalLaborCharges += vm.newinvoice.labors[i].totalcharge;
					}
				}
				vm.newinvoice.laborcharges = Number(totalLaborCharges.toFixed(2));
			}
			vm.calcTotalPrice();
		}
		vm.addItem = function(){
			vm.newinvoice.items[vm.itemCount] = {
				quantity : 0,
				unitprice : 0,
				totalcharge : 0
			};
			var appendString = "";
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='item"+vm.itemCount+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.itemCount+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Quantity</p>"
							 			+			"<input type='number' class='form-control itemquantity' id='item"+vm.itemCount+"-quantity' name='item"+vm.itemCount+"-quantity' min='0' max='ivm.newinvoice.items["+vm.itemCount+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.itemCount+"].quantity' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Model</p>"
							 			+			"<select class='form-control itemmodel' id='item"+vm.itemCount+"-model' name='item"+vm.itemCount+"-model' ng-model='ivm.newinvoice.items["+vm.itemCount+"].model' ng-change='ivm.determineQuanPrice("+vm.itemCount+");'>"
							 			+				"<option ng-repeat='model in ivm.models' value='{{model}}'>{{model}}</option>"
							 			+			"</select>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Brand</p>"
							 			+			"<input class='form-control itembrand' id='item"+vm.itemCount+"-brand' name='item"+vm.itemCount+"-brand' ng-model='ivm.newinvoice.items["+vm.itemCount+"].brand' ng-change='ivm.determineCategories("+vm.itemCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Category</p>"
							 			+			"<input class='form-control itemcategory' id='item"+vm.itemCount+"-category' name='item"+vm.itemCount+"-category' ng-model='ivm.newinvoice.items["+vm.itemCount+"].category' ng-change='ivm.determineModels("+vm.itemCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Unit Price</p>"
							 			+			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.itemCount+"-unitprice' name='item"+vm.itemCount+"-unitprice' ng-model='ivm.newinvoice.items["+vm.itemCount+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Spiff Amount</p>"
							 			+			"<input type='number' step='.01' class='form-control itemspiffamount' id='item"+vm.itemCount+"-spiffamount' name='item"+vm.itemCount+"-spiffamount' ng-model='ivm.newinvoice.items["+vm.itemCount+"].spiffamount'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Price</p>"
							 			+			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.itemCount+"-totalcharge' name='item"+vm.itemCount+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.itemCount+"].totalcharge' disabled>"
										+		"</div>"
										+	"</div>"
										+ "</div>";
			var el = angular.element(appendString);
			$("#item-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.itemCount++;
		}
		vm.determineCategories = function(itemnumber){
			// console.log(vm['brand'+itemnumber]);
			vm['categories'+itemnumber] = [];
			console.log(vm.products);
			for(var i=0;i<vm.products.length;i++){
				console.log(vm.products[i].brand);
				console.log(vm.newinvoice.items[itemnumber].brand);
				if(vm.products[i].brand === vm.newinvoice.items[itemnumber].brand && vm['categories'+itemnumber].indexOf(vm.products[i].category) === -1){
					vm['categories'+itemnumber].push(vm.products[i].category);
				}
			}
			console.log(vm['categories'+itemnumber]);
		}
		vm.determineModels = function(itemnumber){
			console.log(vm['categories'+itemnumber]);
			vm['models'+itemnumber] = [];
			for(var i=0;i<vm.products.length;i++){
				if(vm.products[i].brand === vm.newinvoice.items[itemnumber].brand && vm.products[i].category === vm.newinvoice.items[itemnumber].category && vm['models'+itemnumber].indexOf(vm.products[i].model) === -1){
					vm['models'+itemnumber].push(vm.products[i].model);
				}
			}
			console.log(vm['models'+itemnumber]);
		}
		vm.determineQuanPrice = function(itemnumber){
			console.log(vm.newinvoice.items[itemnumber].model);
			vm.newinvoice.items[itemnumber].quantity = 0;
			vm.newinvoice.items[itemnumber].quantitymax = 0;
			vm.newinvoice.items[itemnumber].unitprice = 0;
			vm.newinvoice.items[itemnumber].unitcost = 0;
			for(var i=0;i<vm.products.length;i++){
				console.log(vm.products[i]);
				if(vm.products[i].model === vm.newinvoice.items[itemnumber].model){
					vm.newinvoice.items[itemnumber].brand = vm.products[i].brand;
					vm.newinvoice.items[itemnumber].category = vm.products[i].category;
					vm.newinvoice.items[itemnumber].quantitymax = vm.products[i].quantity;
					vm.newinvoice.items[itemnumber].unitprice = vm.products[i].price;
					vm.newinvoice.items[itemnumber].spiffamount = vm.products[i].spiff;
					vm.newinvoice.items[itemnumber].unitcost = vm.products[i].cost;
				}
			}
			if(vm.newinvoice.items[itemnumber].spiffamount > 0){
				vm.addProductSpiffToTotal(vm.newinvoice.items[itemnumber].spiffamount);
			}
			console.log(vm.newinvoice.items[itemnumber].unitprice);
			console.log(vm.newinvoice.items[itemnumber].quantity);
		}
		vm.addProductSpiffToTotal = function(spiffamount){
			totalSpiffAmount = vm.newinvoice.spifftotal + spiffamount;
			vm.newinvoice.spifftotal = totalSpiffAmount;
		}
		vm.minusProductSpiffToTotal = function(spiffamount){
			vm.newinvoice.spifftotal -= spiffamount;
		}
		vm.determineTotalPrice = function(itemnumber){
			console.log("total charge");
			console.log(vm.newinvoice.items[itemnumber].totalcharge);
			console.log("quantity");
			console.log(vm.newinvoice.items[itemnumber].quantity);
			console.log("unit price");
			console.log(vm.newinvoice.items[itemnumber].unitprice);
			vm.newinvoice.items[itemnumber].totalcharge = vm.newinvoice.items[itemnumber].quantity * vm.newinvoice.items[itemnumber].unitprice;
			vm.newinvoice.items[itemnumber].totalcost = vm.newinvoice.items[itemnumber].quantity * vm.newinvoice.items[itemnumber].unitcost;
			console.log("total charge");
			console.log(vm.newinvoice.items[itemnumber].totalcharge);
			vm.calculateItemTotals(itemnumber);
		}
		vm.calculateItemTotals = function(itemnumber){
			console.log(vm.newinvoice.items);
			var totalPrice = 0;
			var totalCost = 0;
			for(var i=0;i<vm.newinvoice.items.length;i++){
				console.log(i);
				if(vm.newinvoice.items[i]){
					totalPrice += vm.newinvoice.items[i].totalcharge;
					totalCost += vm.newinvoice.items[i].totalcost;
				}
			}
			vm.newinvoice.itemcharges = Number(totalPrice.toFixed(2));
			vm.newinvoice.totalcost = Number(totalCost.toFixed(2));
			vm.calculateTax();
			vm.calcTotalPrice();
		}
		vm.deleteItem = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.items);
			$("#item"+itemnumber).remove();
			if(vm.newinvoice.items[itemnumber].spiffamount > 0){
				vm.minusProductSpiffToTotal(vm.newinvoice.items[itemnumber].spiffamount);
			}
			vm.newinvoice.itemcharges -= vm.newinvoice.items[itemnumber].totalcharge;
			vm.newinvoice.totalcost -= vm.newinvoice.items[itemnumber].totalcost;
			vm.newinvoice.items[itemnumber] = null;
			vm.itemCount--;
			var found = 0;
			for(var i=0;i<vm.newinvoice.items.length;i++){
				if(vm.newinvoice.items[i] != null){
					console.log("not null");
					found = 1;
				}
			}
			if(found === 0){
				vm.newinvoice.items = [];
				vm.invoiceItems = [];
				console.log(vm.newinvoice.items);
				console.log(vm.itemCount);
			}
			if(vm.itemCount == 0){
				$("#item-group").empty();
				var appendString = "<span>Items</span><br>";
				var el = angular.element(appendString);
				$("#item-group").append(el);
				compiled = $compile(el);
				compiled($scope);
			}
			if(vm.newinvoice.taxexempt != true){
				vm.calculateTax();
			}
			vm.calcTotalPrice();
		}
		vm.calculateTax = function(){
			vm.newinvoice.taxdue = vm.newinvoice.itemcharges * vm.newinvoice.taxrate;
			console.log(vm.newinvoice.taxdue);
			vm.newinvoice.taxdue = Number(vm.newinvoice.taxdue.toFixed(2));
			vm.newinvoice.itemtotalwtax = vm.newinvoice.itemcharges + vm.newinvoice.taxdue;
			console.log(vm.newinvoice.itemtotalwtax);
			vm.newinvoice.itemtotalwtax = Number(vm.newinvoice.itemtotalwtax.toFixed(2));
		}
		vm.calcTotalPrice = function(){
			vm.newinvoice.totalprice = vm.newinvoice.itemcharges + vm.newinvoice.laborcharges + vm.newinvoice.othercharges + vm.newinvoice.taxdue;
			vm.newinvoice.totalprice = Number(vm.newinvoice.totalprice.toFixed(2));
			var paymenttotal = 0;
			if(vm.newinvoice.payments){
				for(var i=0;i<vm.newinvoice.payments;i++){
					paymenttotal += vm.newinvoice.payments[i].amountpaid;
				}
			}
			vm.newinvoice.totalafterpayments = vm.newinvoice.totalprice - paymenttotal;
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><invoicing></invoicing></div>";
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