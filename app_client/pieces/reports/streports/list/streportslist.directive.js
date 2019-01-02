(function () {
	angular
		.module('ssacpos')
		.directive('streportslist', streportslist);

	function streportslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/streports/list/streportslist.template.html',
			controller: 'streportslistCtrl as rvm'
		};
	}
}) ();