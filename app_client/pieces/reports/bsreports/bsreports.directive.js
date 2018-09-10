(function () {
	angular
		.module('ssacpos')
		.directive('bsreports', bsreports);

	function bsreports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/bsreports/bsreports.template.html',
			controller: 'bsreportsCtrl as rvm'
		};
	}
}) ();