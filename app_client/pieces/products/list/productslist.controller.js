(function(){
angular
	.module('ssacpos')
	.controller('productslistCtrl', productslistCtrl);

productslistCtrl.$inject = ['$location','$scope','$compile','product','exportservice'];

function productslistCtrl ($location,$scope,$compile,product,exportservice) {
	var vm = this;
	product.getProductList().then(function(response){
		vm.products = response.data;
	})
	vm.addProduct = function() {
		$(".products-container").empty();
		var stringToAppend = "<div class='col-xs-12'><productcreate></productcreate></div>";
		var el = angular.element(stringToAppend)
		$(".products-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteProduct = function(productid,productmodel) {
		vm.product = {
			id : productid,
			model : productmodel
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete: <br>"+productmodel+"</p>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='pvm.confirmDelete();'>Yes</button></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='pvm.cancel();'>No</button></div>"
						 + "</div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
		$("#productModal").modal('hide');
	}
	vm.readOne = function(productid){
		console.log(vm.products);
		for (var i = 0; i < vm.products.length; i++) {
			if(vm.products[i]._id === productid){
				vm.clickedProduct = vm.products[i];
				console.log(vm.clickedProduct);
			}
		}
	}
	vm.editProduct = function(productid){
		vm.product = {
			id : productid
		}
		product.setProduct(vm.product);
		$(".products-container").empty();
		var stringToAppend = "<div class='col-xs-12'><productedit></productedit></div>";
		var el = angular.element(stringToAppend)
		$(".products-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		console.log(vm.product);
		product.deleteProduct(vm.product.id).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
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
			$(".dialogbox").show();
		})
	}
	vm.exportProducts = function(){
		exportservice.exportCSV(vm.products,"Products").then(function(response){
			console.log(response);
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>" + response.data
							 +   "</p>"
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
			$(".dialogbox").show();
		})
	}
	vm.showList = function(){
		$(".dialogbox").hide();
		$(".products-container").empty();
		var stringToAppend = "<div class='col-xs-12'><productslist></productslist></div>";
		var el = angular.element(stringToAppend)
		$(".products-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
};
})();