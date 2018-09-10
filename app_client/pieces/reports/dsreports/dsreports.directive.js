(function () {
	angular
		.module('ssacpos')
		.directive('dsreports', dsreports);

	function dsreports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/dsreports/dsreports.template.html',
			controller: 'dsreportsCtrl as rvm'
		};
	}
}) ();