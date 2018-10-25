(function () {
	angular
		.module('ssacpos')
		.directive('bsreportsedit', bsreportsedit);

	function bsreportsedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/bsreports/edit/bsreportsedit.template.html',
			controller: 'bsreportsEditCtrl as rvm'
		};
	}
}) ();