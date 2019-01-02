(function () {
	angular
		.module('ssacpos')
		.directive('tpreportslist', tpreportslist);

	function tpreportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/tpreports/list/tpreportslist.template.html',
			controller: 'tpreportslistCtrl as rvm'
		};
	}
}) ();