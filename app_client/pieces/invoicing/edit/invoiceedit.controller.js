(function(){
angular
	.module('ssacpos')
	.controller('invoiceeditCtrl', invoiceeditCtrl);

invoiceeditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'invoice', 'product'];

function invoiceeditCtrl($location, $scope, $compile, authentication, invoice, product) {
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
			taxrate : 0,
			taxdue : 0,
			othercharges : 0,
			totalprice : 0,
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
		vm.products = [];
		vm.brands = [];
		vm.categories = [];
		vm.models = [];
		invoice.getInvoiceById(vm.currentInvoice.id).then(function(response2){
			console.log(response2);
			vm.newinvoice = response2.data;
			console.log(vm.newinvoice);
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
						appendString 	 +=	"<div class='row row-border productrow' id='item"+vm.itemCount+"'>"
										 +	"<div class='col-xs-12'  style='font-size:.6em'>"
										 +		"<div class='col-xs-1'>"
										 +			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.itemCount+");'>X</button>"
										 +		"</div>"
										 +		"<div class='col-xs-1'>"
										 +			"<input type='number' class='form-control itemquantity' id='item"+vm.itemCount+"-quantity' name='item"+vm.itemCount+"-quantity' min='0' max='ivm.newinvoice.items["+vm.itemCount+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.itemCount+"].quantity' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
										 +		"</div>"
										 +		"<div class='col-xs-2'>"
										 +			"<select class='form-control itemmodel' id='item"+vm.itemCount+"-model' name='item"+vm.itemCount+"-model' ng-model='ivm.newinvoice.items["+vm.itemCount+"].model' ng-change='ivm.determineQuanPrice("+vm.itemCount+");'>"
										 +				"<option ng-repeat='model in ivm.models"+vm.itemCount+"' value='{{model}}'>{{model}}</option>"
										 +			"</select>"
										 +		"</div>"
										 +		"<div class='col-xs-2'>"
										 +			"<input class='form-control itembrand' id='item"+vm.itemCount+"-brand' name='item"+vm.itemCount+"-brand' ng-model='ivm.newinvoice.items["+vm.itemCount+"].brand' ng-change='ivm.determineCategories("+vm.itemCount+");'>"
										 +			"</input>"
										 +		"</div>"
										 +		"<div class='col-xs-2'>"
										 +			"<input class='form-control itemcategory' id='item"+vm.itemCount+"-category' name='item"+vm.itemCount+"-category' ng-model='ivm.newinvoice.items["+vm.itemCount+"].category' ng-change='ivm.determineModels("+vm.itemCount+");'>"
										 +			"</input>"
										 +		"</div>"
										 +		"<div class='col-xs-2'>"
										 +			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.itemCount+"-unitprice' name='item"+vm.itemCount+"-unitprice' ng-model='ivm.newinvoice.items["+vm.itemCount+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
										 +		"</div>"
										 +		"<div class='col-xs-2'>"
										 +			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.itemCount+"-totalcharge' name='item"+vm.itemCount+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.itemCount+"].totalcharge' disabled>"
										 +		"</div>"
										 +	"</div>"
									 +	"</div>";
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
						appendString 	 +=	"<div class='row row-border productrow' id='labor"+vm.laborCount+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.laborCount+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.laborCount+"-time' name='labor"+vm.laborCount+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-5'>"
								 +			"<input type='text' class='form-control labordescription' id='labor"+vm.laborCount+"-description' name='labor"+vm.laborCount+"-description' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.laborCount+"-hourlycharge' name='labor"+vm.laborCount+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.laborCount+"-totalcharge' name='labor"+vm.laborCount+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].totalcharge'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
						var el = angular.element(appendString);
						$("#labor-group").append(el);
						compiled = $compile(el);
						compiled($scope);
						vm.laborCount++;
					};
				};
				vm.newinvoice.labors = vm.invoiceLabors;
				for(var i=0;i<vm.newinvoice.others.length;i++){
					var appendString = "";
					if(vm.newinvoice.others[i]){
						vm.invoiceOthers.push(vm.newinvoice.others[i]);
						appendString 	 +=	"<div class='row row-border productrow' id='other"+vm.otherCount+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.otherCount+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-9'>"
								 +			"<input type='text' class='form-control otherdescription' id='other"+vm.otherCount+"-description' name='other"+vm.otherCount+"-description' ng-model='ivm.newinvoice.others["+vm.otherCount+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control labortotalcharge' id='other"+vm.otherCount+"-totalcharge' name='other"+vm.otherCount+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.otherCount+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.otherCount+");'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
						var el = angular.element(appendString);
						$("#other-group").append(el);
						compiled = $compile(el);
						compiled($scope);
						vm.otherCount++;
					};
				};
				vm.newinvoice.others = vm.invoiceOthers;
			});
		});
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
		vm.addOther = function(){
			var appendString = "";
			if(vm.invoiceOthers===0){
				appendString = appendString + "<div class='top-margin10' style='font-size:.8em'>"
											+ 	"<div class='row row-border' style='text-align:center;'>"
											+		"<div class='col-xs-1'></div>"
											+		"<div class='col-xs-9'>"
											+			"<p>Description</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Total Charge</p>"
											+		"</div>"
											+	"</div>"
											+ "</div>"
			}
			vm.newinvoice.others[vm.otherCount] = {};
			appendString 	 +=	"<div class='row row-border productrow' id='other"+vm.otherCount+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.otherCount+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-9'>"
								 +			"<input type='text' class='form-control otherdescription' id='other"+vm.otherCount+"-description' name='other"+vm.otherCount+"-description' ng-model='ivm.newinvoice.others["+vm.otherCount+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control labortotalcharge' id='other"+vm.otherCount+"-totalcharge' name='other"+vm.otherCount+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.otherCount+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.otherCount+");'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
			var el = angular.element(appendString);
			$("#other-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.otherCount++;
		}
		vm.deleteOther = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.others);
			vm.newinvoice.others[itemnumber] = null;
			$("#other"+itemnumber).remove();
			var totalOtherCharge = 0;
			for(var i=0;i<vm.newinvoice.others.length;i++){
				if(vm.newinvoice.others[i]){
					totalOtherCharge += vm.newinvoice.others[i].totalcharge;
				}
			}
			vm.newinvoice.othercharges = totalOtherCharge;
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
			if(vm.invoiceLabors===0){
				appendString = appendString + "<div class='top-margin10' style='font-size:.8em'>"
											+ 	"<div class='row row-border' style='text-align:center;'>"
											+		"<div class='col-xs-1'></div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Time (hrs)</p>"
											+		"</div>"
											+		"<div class='col-xs-5'>"
											+			"<p>Description</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Hourly Charge</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Total Charge</p>"
											+		"</div>"
											+	"</div>"
											+ "</div>"
			}
			vm.newinvoice.labors[vm.laborCount] = {};
			appendString 	 +=	"<div class='row row-border productrow' id='labor"+vm.laborCount+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.laborCount+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.laborCount+"-time' name='labor"+vm.laborCount+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-5'>"
								 +			"<input type='text' class='form-control labordescription' id='labor"+vm.laborCount+"-description' name='labor"+vm.laborCount+"-description' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.laborCount+"-hourlycharge' name='labor"+vm.laborCount+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.laborCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.laborCount+"-totalcharge' name='labor"+vm.laborCount+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.laborCount+"].totalcharge'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
			var el = angular.element(appendString);
			$("#labor-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.laborCount++;
		}
		vm.deleteLabor = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.items);
			vm.newinvoice.labors[itemnumber] = null;
			$("#labor"+itemnumber).remove();
			var totalLaborCharges = 0;
			for(var i=0;i<vm.newinvoice.labors.length;i++){
				if(vm.newinvoice.labors[i]){
					totalLaborCharges += vm.newinvoice.labors[i].totalcharge;
				}
			}
			vm.newinvoice.laborcharges = Number(totalLaborCharges.toFixed(2));
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
			var appendString = "";
			if(vm.invoiceItems===0){
				appendString = appendString + "<div class='top-margin10' style='font-size:.8em'>"
											+ 	"<div class='row row-border' style='text-align:center;'>"
											+		"<div class='col-xs-1'></div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Brand</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Category</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Model</p>"
											+		"</div>"
											+		"<div class='col-xs-1'>"
											+			"<p>Quantity</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Unit Price</p>"
											+		"</div>"
											+		"<div class='col-xs-2'>"
											+			"<p>Total Price</p>"
											+		"</div>"
											+	"</div>"
											+ "</div>"
			}
			vm.newinvoice.items[vm.itemCount] = {
				quantity : 0,
				unitprice : 0,
				totalcharge : 0
			};
			// console.log(vm.newinvoice.items[1].quantity);
			appendString 	 +=	"<div class='row row-border productrow' id='item"+vm.itemCount+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.itemCount+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itembrand' id='item"+vm.itemCount+"-brand' name='item"+vm.itemCount+"-brand' ng-model='ivm.newinvoice.items["+vm.itemCount+"].brand' ng-change='ivm.determineCategories("+vm.itemCount+");'>"
								 +				"<option ng-repeat='brand in ivm.brands' value='{{brand}}'>{{brand}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itemcategory' id='item"+vm.itemCount+"-category' name='item"+vm.itemCount+"-category' ng-model='ivm.newinvoice.items["+vm.itemCount+"].category' ng-change='ivm.determineModels("+vm.itemCount+");'>"
								 +				"<option ng-repeat='category in ivm.categories"+vm.itemCount+"' value='{{category}}'>{{category}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itemmodel' id='item"+vm.itemCount+"-model' name='item"+vm.itemCount+"-model' ng-model='ivm.newinvoice.items["+vm.itemCount+"].model' ng-change='ivm.determineQuanPrice("+vm.itemCount+");'>"
								 +				"<option ng-repeat='model in ivm.models"+vm.itemCount+"' value='{{model}}'>{{model}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-1'>"
								 +			"<input type='number' class='form-control itemquantity' id='item"+vm.itemCount+"-quantity' name='item"+vm.itemCount+"-quantity' min='0' max='ivm.newinvoice.items["+vm.itemCount+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.itemCount+"].quantity' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.itemCount+"-unitprice' name='item"+vm.itemCount+"-unitprice' ng-model='ivm.newinvoice.items["+vm.itemCount+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.itemCount+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.itemCount+"-totalcharge' name='item"+vm.itemCount+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.itemCount+"].totalcharge' disabled>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
			var el = angular.element(appendString);
			$("#item-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceItems++;
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
			for(var i=0;i<vm.products.length;i++){
				console.log(vm.products[i]);
				if(vm.products[i].model === vm.newinvoice.items[itemnumber].model){
					vm.newinvoice.items[itemnumber].quantitymax = vm.products[i].quantity;
					vm.newinvoice.items[itemnumber].unitprice = vm.products[i].price;
				}
			}
			console.log(vm.newinvoice.items[itemnumber].unitprice);
			console.log(vm.newinvoice.items[itemnumber].quantity);
		}
		vm.determineTotalPrice = function(itemnumber){
			console.log(vm['quantity'+itemnumber]);
			vm.newinvoice.items[itemnumber].totalcharge = vm.newinvoice.items[itemnumber].quantity * vm.newinvoice.items[itemnumber].unitprice;
			vm.calculateItemTotals(itemnumber);
		}
		vm.calculateItemTotals = function(itemnumber){
			console.log(vm.newinvoice.items);
			var totalPrice = 0;
			for(var i=0;i<vm.newinvoice.items.length;i++){
				console.log(i);
				if(vm.newinvoice.items[i]){
					totalPrice += vm.newinvoice.items[i].totalcharge;
				}
			}
			vm.newinvoice.itemcharges = Number(totalPrice.toFixed(2));
			vm.calculateTax();
			vm.calcTotalPrice();
		}
		vm.deleteItem = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.items);
			vm.newinvoice.items[itemnumber] = null;
			$("#item"+itemnumber).remove();
			var totalPrice = 0;
			console.log(vm.newinvoice.items);
			for(var i=0;i<vm.newinvoice.items.length;i++){
				console.log(i);
				if(vm.newinvoice.items[i]){
					totalPrice += vm.newinvoice.items[i].totalcharge;
				}
			}
			vm.newinvoice.itemcharges = Number(totalPrice.toFixed(2));
			vm.calculateTax();
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