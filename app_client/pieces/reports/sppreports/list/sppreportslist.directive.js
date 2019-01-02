(function () {
	angular
		.module('ssacpos')
		.directive('sppreportslist', sppreportslist);

	function sppreportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/sppreports/list/sppreportslist.template.html',
			controller: 'sppreportslistCtrl as rvm'
		};
	}
}) ();