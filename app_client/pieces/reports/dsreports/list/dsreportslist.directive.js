(function () {
	angular
		.module('ssacpos')
		.directive('dsreportslist', dsreportslist);

	function dsreportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/dsreports/list/dsreportslist.template.html',
			controller: 'dsreportslistCtrl as rvm'
		};
	}
}) ();