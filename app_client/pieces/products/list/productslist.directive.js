(function () {
	angular
		.module('ssacpos')
		.directive('productslist', productslist);

	function productslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/products/list/productslist.template.html',
			controller: 'productslistCtrl as pvm'
		};
	}
}) ();