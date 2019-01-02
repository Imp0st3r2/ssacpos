(function () {
	angular
		.module('ssacpos')
		.directive('ipreportslist', ipreportslist);

	function ipreportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/ipreports/list/ipreportslist.template.html',
			controller: 'ipreportslistCtrl as rvm'
		};
	}
}) ();