(function () {
	angular
		.module('ssacpos')
		.directive('invoiceedit', invoiceedit);

	function invoiceedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/invoicing/edit/invoiceedit.template.html',
			controller: 'invoiceeditCtrl as ivm'
		};
	}
}) ();