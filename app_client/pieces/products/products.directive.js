(function () {
	angular
		.module('ssacpos')
		.directive('products', products);

	function products() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/products/products.template.html',
			controller: 'productsCtrl as pvm'
		};
	}
}) ();