(function () {
	angular
		.module('ssacpos')
		.directive('tpreports', tpreports);

	function tpreports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/tpreports/tpreports.template.html',
			controller: 'tpreportsCtrl as rvm'
		};
	}
}) ();