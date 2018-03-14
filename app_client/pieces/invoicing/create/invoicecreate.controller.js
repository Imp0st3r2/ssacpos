(function(){
angular
	.module('ssacpos')
	.controller('invoicecreateCtrl', invoicecreateCtrl);

invoicecreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'invoice', 'product', 'tax'];

function invoicecreateCtrl($location, $scope, $compile, authentication, invoice, product, tax) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentUser = authentication.currentUser();
	vm.invoiceItems = 0;
	vm.invoiceLabors = 0;
	vm.invoiceOthers = 0;
	vm.currentInvoice = {};
	if(vm.isLoggedIn){
		vm.invoices = {};
		vm.newinvoice = {
			firstname: "",
			lastname: "",
			address: "",
			state: "",
			city: "",
			zip : "",
			phone : "",
			email : "",
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
		vm.products = [];
		vm.brands = [];
		vm.categories = [];
		vm.models = [];
		tax.getTaxRate().then(function(response){
			vm.newinvoice.taxrate = Number(response.data);
		})
		product.getProductList().then(function(response){
			console.log(response.data);
			vm.products = response.data;
			console.log(vm.products);
			for(product in vm.products){
				console.log(product);
				if(vm.brands.indexOf(vm.products[product].brand) === -1){
					vm.brands.push(vm.products[product].brand);
				}
			}
			console.log(vm.brands);
		});
		$("#product-brand").on('change',function(){
			if($("#product-brand").val()==="newbrand"){
				vm.newbrand = true;
			}else{
				vm.newbrand = false;
			}
		})
		$("#product-newcategory").on('change',function(){
			for(attr in vm.attr){
				if(attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "size" && attr != "configuration" && attr != "description"){
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
				if(attr != "brand" && attr != "category" && attr != "model" && attr != "price" && attr != "size" && attr != "configuration" && attr != "description"){
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
		$(document).on('keydown', function(e) {
    		// console.log("key pressed");
    		if (e.which == 13) {
        		e.preventDefault();
    		}
		});
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
			vm.newinvoice.others[vm.invoiceOthers] = {};
			appendString 	 +=	"<div class='row row-border productrow' id='other"+vm.invoiceOthers+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteOther("+vm.invoiceOthers+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-9'>"
								 +			"<input type='text' class='form-control otherdescription' id='other"+vm.invoiceOthers+"-description' name='other"+vm.invoiceOthers+"-description' ng-model='ivm.newinvoice.others["+vm.invoiceOthers+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control labortotalcharge' id='other"+vm.invoiceLabors+"-totalcharge' name='other"+vm.invoiceOthers+"-totalcharge' ng-model='ivm.newinvoice.others["+vm.invoiceOthers+"].totalcharge' ng-change='ivm.determineTotalOtherCharge("+vm.invoiceOthers+");'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
			var el = angular.element(appendString);
			$("#other-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceOthers++;
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
			vm.newinvoice.labors[vm.invoiceLabors] = {};
			appendString 	 +=	"<div class='row row-border productrow' id='labor"+vm.invoiceLabors+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteLabor("+vm.invoiceLabors+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.25' class='form-control labortime' id='labor"+vm.invoiceLabors+"-time' name='labor"+vm.invoiceLabors+"-time' min='0' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].time' ng-change='ivm.determineTotalLaborCharge("+vm.invoiceLabors+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-5'>"
								 +			"<input type='text' class='form-control labordescription' id='labor"+vm.invoiceLabors+"-description' name='labor"+vm.invoiceLabors+"-description' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].description'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control laborhourlycharge' id='labor"+vm.invoiceLabors+"-hourlycharge' name='labor"+vm.invoiceLabors+"-hourlycharge' min='0' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].hourlycharge' ng-change='ivm.determineTotalLaborCharge("+vm.invoiceLabors+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input disabled type='number' step='.01' class='form-control labortotalcharge' id='labor"+vm.invoiceLabors+"-totalcharge' name='labor"+vm.invoiceLabors+"-totalcharge' ng-model='ivm.newinvoice.labors["+vm.invoiceLabors+"].totalcharge'>"
								 +		"</div>"
								 +	"</div>"
							 +	"</div>";
			var el = angular.element(appendString);
			$("#labor-group").append(el);
			compiled = $compile(el);
			compiled($scope);
			vm.invoiceLabors++;
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
			vm.newinvoice.items[vm.invoiceItems] = {
				quantity : 0,
				unitprice : 0,
				totalcharge : 0
			};
			// console.log(vm.newinvoice.items[1].quantity);
			appendString 	 +=	"<div class='row row-border productrow' id='item"+vm.invoiceItems+"'>"
								 +	"<div class='col-xs-12'  style='font-size:.6em'>"
								 +		"<div class='col-xs-1'>"
								 +			"<button class='btn btn-danger' ng-click='ivm.deleteItem("+vm.invoiceItems+");'>X</button>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itembrand' id='item"+vm.invoiceItems+"-brand' name='item"+vm.invoiceItems+"-brand' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].brand' ng-change='ivm.determineCategories("+vm.invoiceItems+");'>"
								 +				"<option ng-repeat='brand in ivm.brands' value='{{brand}}'>{{brand}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itemcategory' id='item"+vm.invoiceItems+"-category' name='item"+vm.invoiceItems+"-category' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].category' ng-change='ivm.determineModels("+vm.invoiceItems+");'>"
								 +				"<option ng-repeat='category in ivm.categories"+vm.invoiceItems+"' value='{{category}}'>{{category}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<select class='form-control itemmodel' id='item"+vm.invoiceItems+"-model' name='item"+vm.invoiceItems+"-model' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].model' ng-change='ivm.determineQuanPrice("+vm.invoiceItems+");'>"
								 +				"<option ng-repeat='model in ivm.models"+vm.invoiceItems+"' value='{{model}}'>{{model}}</option>"
								 +			"</select>"
								 +		"</div>"
								 +		"<div class='col-xs-1'>"
								 +			"<input type='number' class='form-control itemquantity' id='item"+vm.invoiceItems+"-quantity' name='item"+vm.invoiceItems+"-quantity' min='0' max='ivm.newinvoice.items["+vm.invoiceItems+"].quantitymax' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].quantity' ng-change='ivm.determineTotalPrice("+vm.invoiceItems+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control itemunitprice' id='item"+vm.invoiceItems+"-unitprice' name='item"+vm.invoiceItems+"-unitprice' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].unitprice' ng-change='ivm.determineTotalPrice("+vm.invoiceItems+");'>"
								 +		"</div>"
								 +		"<div class='col-xs-2'>"
								 +			"<input type='number' step='.01' class='form-control itemtotalcharge' id='item"+vm.invoiceItems+"-totalcharge' name='item"+vm.invoiceItems+"-totalcharge' ng-model='ivm.newinvoice.items["+vm.invoiceItems+"].totalcharge' disabled>"
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
			console.log(vm['brand'+itemnumber]);
			vm['categories'+itemnumber] = [];
			for(var i=0;i<vm.products.length;i++){
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
		vm.toggleAttributes = function(){
			$("#additional-attributes").slideToggle();
		}
		vm.submitInvoice = function(){
			console.log(vm.newinvoice);
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
				console.log(response);
				$(".dialogbox").show();
			})
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