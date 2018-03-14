(function () {
	angular
		.module('ssacpos')
		.directive('invoicecreate', invoicecreate);

	function invoicecreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/invoicing/create/invoicecreate.template.html',
			controller: 'invoicecreateCtrl as ivm'
		};
	}
}) ();