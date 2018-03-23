(function () {
	angular
		.module('ssacpos')
		.directive('reports', reports);

	function reports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/reports.template.html',
			controller: 'reportsCtrl as rvm'
		};
	}
}) ();