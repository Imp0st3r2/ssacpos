(function () {
	angular
		.module('ssacpos')
		.directive('sppreports', sppreports);

	function sppreports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/sppreports/sppreports.template.html',
			controller: 'sppreportsCtrl as rvm'
		};
	}
}) ();