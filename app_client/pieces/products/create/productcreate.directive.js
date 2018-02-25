(function () {
	angular
		.module('ssacpos')
		.directive('productcreate', productcreate);

	function productcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/products/create/productcreate.template.html',
			controller: 'productcreateCtrl as pvm'
		};
	}
}) ();