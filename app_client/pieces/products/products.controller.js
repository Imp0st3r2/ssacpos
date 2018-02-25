(function(){
angular
	.module('ssacpos')
	.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['$location','$scope','$compile','product'];

function productsCtrl ($location,$scope,$compile,product) {
	var vm = this;
	product.getProductList().then(function(response){
		vm.products = response.data;
	})
	vm.addProduct = function() {
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><productcreate></productcreate></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
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
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><productedit></productedit></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		console.log(vm.product);
		product.deleteProduct(vm.product.id).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
			product.getProductList().then(function(response){
				vm.products = response.data;
				console.log(response);
			})
		})
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
};
})();