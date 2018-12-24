(function () {
	angular
		.module('ssacpos')
		.directive('dsreportsedit', dsreportsedit);

	function dsreportsedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/dsreports/edit/dsreportsedit.template.html',
			controller: 'dsreportsEditCtrl as rvm'
		};
	}
}) ();