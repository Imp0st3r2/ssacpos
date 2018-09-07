(function(){
angular
	.module('ssacpos')
	.controller('invoicecreateCtrl', invoicecreateCtrl);

invoicecreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'invoice', 'product', 'tax', 'account', 'spiff'];

function invoicecreateCtrl($location, $scope, $compile, authentication, invoice, product, tax, account, spiff) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentUser = authentication.currentUser();
	vm.invoiceItems = 0;
	vm.invoiceLabors = 0;
	vm.invoiceOthers = 0;
	vm.invoiceSpiffs = 0;
	vm.currentInvoice = {};
	vm.accounts = [];
	if(vm.isLoggedIn){
		account.getAccountList().then(function(response){
			vm.accounts = response.data;
			console.log(vm.accounts);
		});
		vm.newaccount = {
			firstname : "",
			lastname : "",
			address : "",
			city : "",
			state : "",
			zip : "",
			phone : "",
			email : "",
			taxexempt : false
		}
		vm.newinvoice = {
			account : vm.newaccount,
			vehiclemake : "",
			vehiclemodel : "",
			vehicleyear : "",
			vehiclelicense : "",
			vehiclevin : "",
			salesrep : vm.currentUser.name,
			items : [],
			labors : [],
			others : [],
			spiffs : [],
			spifftotal : 0,
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
		vm.products = [];
		vm.brands = [];
		vm.categories = [];
		vm.models = [];
		tax.getTaxRate().then(function(response){
			vm.newinvoice.taxrate = Number(response.data);
			console.log(vm.newinvoice.taxrate);
		})
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
			console.log(vm.models);
		});
		spiff.getSpiffs().then(function(response){
			vm.spiffs = response.data;
			console.log(vm.spiffs);
		})
		var clickcount = 0;
		$("#invoice-phone").keypress(function(){
			if($("#invoice-phone").val().length === 0){
				vm.newaccount.phone = "(" + vm.newaccount.phone;
				$("#invoice-phone").val(vm.newaccount.phone);
			}else{
				// console.log(phoneCount);
				if($("#invoice-phone").val().length === 4){
					console.log(vm.newaccount.phone);
					vm.newaccount.phone = vm.newaccount.phone + ")";
					console.log(vm.newaccount.phone);
					$("#invoice-phone").val(vm.newaccount.phone);
				}else if($("#invoice-phone").val().length === 8){
					vm.newaccount.phone = vm.newaccount.phone + "-";
					$("#invoice-phone").val(vm.newaccount.phone);
				}
			}
		});
		$("#invoice-phone").on('keydown',function(e){
			if(e.which === 9){
				for(var i=0;i<vm.accounts.length;i++){
					if(vm.accounts[i].phone === $("#invoice-phone").val()){
						vm.newaccount = vm.accounts[i];
						vm.newinvoice.account = vm.newaccount;
					}
				}
				console.log(vm.newaccount);
				console.log(vm.newinvoice);
    		}
		})
		$(document).on('keydown', function(e) {
    		// console.log("key pressed");
    		if (e.which == 13) {
        		e.preventDefault();
    		}
		});
		$("input[type=checkbox]").on('click',function(){
			if($(this).prop("checked")){
				vm.newinvoice.taxdue = 0;
				vm.calcTotalPrice();
			}else{
				vm.calculateTax();
				vm.calcTotalPrice();
			}
		})
		vm.addSpiff = function(){
			var appendString = "";
			vm.newinvoice.spiffs[vm.invoiceSpiffs] = {
				name : "",
				amount : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='spiff"+vm.invoiceSpiffs+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteSpiff("+vm.invoiceSpiffs+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-9'>"
										+			"<p>Name</p>"
										+			"<select class='form-control spiffname' id='spiff"+vm.invoiceSpiffs+"-name' name='spiff"+vm.invoiceSpiffs+"-name' ng-model='ivm.newinvoice.spiffs["+vm.invoiceSpiffs+"].name' ng-change='ivm.totalSpiffs("+vm.invoiceSpiffs+");'>"
										+				"<option ng-repeat='spiff in ivm.spiffs' value='{{spiff.name}}'>{{spiff.name}}</option>"
										+			"</select>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Amount</p>"
										+			"<input type='number' step='.01' class='form-control spiffamount' id='spiff"+vm.invoiceSpiffs+"-amount' name='spiff"+vm.invoiceSpiffs+"-amount' ng-model='ivm.newinvoice.spiffs["+vm.invoiceSpiffs+"].amount'>" 
										+		"</div>"
										+	"</div>"
										+ "</div>";
			var el = angular.element(appendString);
			$("#spiff-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceSpiffs++;
		}
		vm.deleteSpiff = function(itemnumber){
			console.log(itemnumber);
			console.log(vm.newinvoice.spiffs);
			$("#spiff"+itemnumber).remove();
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
			}
			vm.invoiceSpiffs--;
			if(vm.invoiceSpiffs == 0){
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
		vm.addOther = function(){
			var appendString = "";
			vm.newinvoice.others[vm.invoiceOthers] = {
				description : "",
				totalcharge : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='other"+vm.invoiceOthers+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.invoiceOthers+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-9'>"
										+			"<p>Description</p>"
							 			+			"<input type='text' class='form-control othername' id='other"+vm.invoiceOthers+"-description' name='other"+vm.invoiceOthers+"-description' ng-model='ivm.newinvoice.others["+vm.invoiceOthers+"].description'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Charge</p>"
							 			+			"<input type='number' step='.01' class='form-control othertotalcharge' id='other"+vm.invoiceOthers+"-totalcharge' name='other"+vm.invoiceOthers+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.invoiceOthers+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.invoiceOthers+");'>"
										+		"</div>"
										+	"</div>"
										+ "</div>";
			var el = angular.element(appendString);
			$("#other-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceOthers++;
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
			vm.invoiceOthers--;
			console.log(vm.invoiceOthers);
			if(vm.invoiceOthers == 0){
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
			vm.newinvoice.labors[vm.invoiceLabors] = {
				time : 0,
				description : "",
				hourlycharge : 0,
				totalcharge : 0
			};
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='labor"+vm.invoiceLabors+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.invoiceLabors+");'>X</button>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Time (hrs)</p>"
							 			+			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.invoiceLabors+"-time' name='labor"+vm.invoiceLabors+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.invoiceLabors+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-5'>"
										+			"<p>Description</p>"
							 			+			"<input type='text' class='form-control labordescription' id='labor"+vm.invoiceLabors+"-description' name='labor"+vm.invoiceLabors+"-description' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].description'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Hourly Charge</p>"
							 			+			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.invoiceLabors+"-hourlycharge' name='labor"+vm.invoiceLabors+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.invoiceLabors+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Charge</p>"
							 			+			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.invoiceLabors+"-totalcharge' name='labor"+vm.invoiceLabors+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].totalcharge'>"
										+		"</div>"
										+	"</div>"
										+ "</div>"
			var el = angular.element(appendString);
			$("#labor-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceLabors++;
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
			vm.invoiceLabors--;
			if(vm.invoiceLabors === 0){
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
			var appendString = "";
			vm.newinvoice.items[vm.invoiceItems] = {
				quantity : 0,
				unitprice : 0,
				totalcharge : 0,
				spiffamount : 0
			};
			// if(vm.invoiceItems===0){
			appendString = appendString + "<div class='top-margin10 col-xs-12' style='font-size:.8em' id='item"+vm.invoiceItems+"'>"
										+ 	"<div class='row' style='text-align:center;'>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Delete</p>"
							 			+			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.invoiceItems+");'>X</button>"
							 			+ 		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Quantity</p>"
							 			+			"<input type='number' class='form-control itemquantity' id='item"+vm.invoiceItems+"-quantity' name='item"+vm.invoiceItems+"-quantity' min='0' max='ivm.newinvoice.items["+vm.invoiceItems+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].quantity' ng-change='ivm.determineTotalPrice("+vm.invoiceItems+");'>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Model</p>"
										+			"<select class='form-control itemmodel' id='item"+vm.invoiceItems+"-model' name='item"+vm.invoiceItems+"-model' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].model' ng-change='ivm.determineQuanPrice("+vm.invoiceItems+");'>"
										+				"<option ng-repeat='model in ivm.models' value='{{model}}'>{{model}}</option>"
										+			"</select>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Brand</p>"
										+			"<input class='form-control itembrand' id='item"+vm.invoiceItems+"-brand' name='item"+vm.invoiceItems+"-brand' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].brand' ng-change='ivm.determineCategories("+vm.invoiceItems+");'>"
										+			"</input>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Category</p>"
										+			"<input class='form-control itemcategory' id='item"+vm.invoiceItems+"-category' name='item"+vm.invoiceItems+"-category' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].category' ng-change='ivm.determineModels("+vm.invoiceItems+");'>"
										+			"</input>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Unit Price</p>"
							 			+			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.invoiceItems+"-unitprice' name='item"+vm.invoiceItems+"-unitprice' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.invoiceItems+");'></input>"
							 			+		"</div>"
										+		"<div class='col-xs-12 col-md-1'>"
										+			"<p>Spiff Amount</p>"
							 			+			"<input type='number' step='.01' class='form-control itemspiffamount' id='item"+vm.invoiceItems+"-spiffamount' name='item"+vm.invoiceItems+"-spiffamount' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].spiffamount'></input>"
										+		"</div>"
										+		"<div class='col-xs-12 col-md-2'>"
										+			"<p>Total Price</p>"
							 			+			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.invoiceItems+"-totalcharge' name='item"+vm.invoiceItems+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].totalcharge' disabled></input>"
										+		"</div>"
										+	"</div>"
										+ "</div>"
			// }
			console.log(vm.newinvoice.items);
			var el = angular.element(appendString);
			$("#item-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceItems++;
		}
		vm.determineQuanPrice = function(itemnumber){
			console.log(vm.newinvoice.items[itemnumber].model);
			vm.newinvoice.items[itemnumber].unitprice = 0;
			for(var i=0;i<vm.products.length;i++){
				console.log(vm.products[i]);
				if(vm.products[i].model === vm.newinvoice.items[itemnumber].model){
					vm.newinvoice.items[itemnumber].brand = vm.products[i].brand;
					vm.newinvoice.items[itemnumber].category = vm.products[i].category;
					vm.newinvoice.items[itemnumber].quantitymax = vm.products[i].quantity;
					vm.newinvoice.items[itemnumber].unitprice = vm.products[i].price;
					vm.newinvoice.items[itemnumber].spiffamount = vm.products[i].spiff;
				}
			}
			if(vm.newinvoice.items[itemnumber].spiffamount > 0){
				vm.addProductSpiffToTotal(vm.newinvoice.items[itemnumber].spiffamount);
			}
			console.log(vm.newinvoice.items[itemnumber]);
			vm.determineTotalPrice(itemnumber);
		}
		vm.determineTotalPrice = function(itemnumber){
			console.log(vm['quantity'+itemnumber]);
			vm.newinvoice.items[itemnumber].totalcharge = vm.newinvoice.items[itemnumber].quantity * vm.newinvoice.items[itemnumber].unitprice;
			vm.calculateItemTotals(itemnumber);
		}
		vm.addProductSpiffToTotal = function(spiffamount){
			totalSpiffAmount = vm.newinvoice.spifftotal + spiffamount;
			vm.newinvoice.spifftotal = totalSpiffAmount;
		}
		vm.minusProductSpiffToTotal = function(spiffamount){
			vm.newinvoice.spifftotal -= spiffamount;
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
			console.log(vm.newinvoice);
			console.log(vm.newaccount);
			if(vm.newaccount.taxexempt != true){
				vm.calculateTax();
			}
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
			vm.newinvoice.items[itemnumber] = null;
			vm.invoiceItems--;
			var found = 0;
			for(var i=0;i<vm.newinvoice.items.length;i++){
				if(vm.newinvoice.items[i] != null){
					console.log("not null");
					found = 1;
				}
			}
			if(found === 0){
				vm.newinvoice.items = [];
				console.log(vm.newinvoice.items);
				console.log(vm.invoiceItems);
			}
			if(vm.invoiceItems == 0){
				$("#item-group").empty();
				var appendString = "<span>Items</span><br>";
				var el = angular.element(appendString);
				$("#item-group").append(el);
				compiled = $compile(el);
				compiled($scope);
			}
			if(vm.newaccount.taxexempt != true){
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
		vm.toggleAttributes = function(){
			$("#additional-attributes").slideToggle();
		}
		vm.submitInvoice = function(){
			console.log(vm.newinvoice);
			if(!vm.newaccount._id){
				account.createAccount(vm.newaccount).then(function(response){
					console.log(response);
					vm.newaccount = response.data;
					vm.newinvoice.account = vm.newaccount;
					vm.finishSubmission();
				})
			}else{
				vm.finishSubmission();
			}
			
		}
		vm.finishSubmission = function(){
			var itemcount = vm.newinvoice.items.length;
			for(item in vm.newinvoice.items){
				console.log(vm.newinvoice.items[item].quantity)
				product.getProductByModel(vm.newinvoice.items[item].model).then(function(response){
					console.log(response.data);
					var requestedproduct = response.data[0];
					requestedproduct.quantity = requestedproduct.quantity - vm.newinvoice.items[item].quantity;

					product.editProduct(requestedproduct).then(function(response){
						console.log(response);
						itemcount--;
						if(itemcount<=0){
							console.log(vm.newinvoice)
							invoice.createInvoice(vm.newinvoice).then(function(response){
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
							},function(err){
								console.log(err);
							})
						}
					})
				})
			}
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><invoicing></invoicing></div>";
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