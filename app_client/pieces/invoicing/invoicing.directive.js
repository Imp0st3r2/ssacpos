(function () {
	angular
		.module('ssacpos')
		.directive('invoicing', invoicing);

	function invoicing() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/invoicing/invoicing.template.html',
			controller: 'invoicingCtrl as ivm'
		};
	}
}) ();