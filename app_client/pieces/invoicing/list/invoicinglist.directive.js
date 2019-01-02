(function () {
	angular
		.module('ssacpos')
		.directive('invoicinglist', invoicinglist);

	function invoicinglist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/invoicing/list/invoicinglist.template.html',
			controller: 'invoicinglistCtrl as ivm'
		};
	}
}) ();