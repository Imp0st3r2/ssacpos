(function () {
	angular
		.module('ssacpos')
		.directive('ipreports', ipreports);

	function ipreports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/ipreports/ipreports.template.html',
			controller: 'ipreportsCtrl as rvm'
		};
	}
}) ();