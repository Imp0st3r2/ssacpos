(function () {
	angular
		.module('ssacpos')
		.directive('bsreportslist', bsreportslist);

	function bsreportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/bsreports/list/bsreportslist.template.html',
			controller: 'bsreportslistCtrl as rvm'
		};
	}
}) ();