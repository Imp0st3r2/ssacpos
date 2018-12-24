(function () {
	angular
		.module('ssacpos')
		.directive('dsreportcreate', dsreportcreate);

	function dsreportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/dsreports/create/dsreportscreate.template.html',
			controller: 'dsreportsCreateCtrl as rvm'
		};
	}
}) ();