(function () {
	angular
		.module('ssacpos')
		.directive('bsreportcreate', bsreportcreate);

	function bsreportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/bsreports/create/bsreportscreate.template.html',
			controller: 'bsreportsCreateCtrl as rvm'
		};
	}
}) ();