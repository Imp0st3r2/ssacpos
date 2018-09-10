(function () {
	angular
		.module('ssacpos')
		.directive('streports', streports);

	function streports() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/streports/streports.template.html',
			controller: 'streportsCtrl as rvm'
		};
	}
}) ();