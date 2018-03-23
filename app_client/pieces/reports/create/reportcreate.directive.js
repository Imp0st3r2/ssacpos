(function () {
	angular
		.module('ssacpos')
		.directive('reportcreate', reportcreate);

	function reportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/create/reportcreate.template.html',
			controller: 'reportcreateCtrl as rvm'
		};
	}
}) ();