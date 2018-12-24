(function () {
	angular
		.module('ssacpos')
		.directive('tpreportsedit', tpreportsedit);

	function tpreportsedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/tpreports/edit/tpreportsedit.template.html',
			controller: 'tpreportsEditCtrl as rvm'
		};
	}
}) ();