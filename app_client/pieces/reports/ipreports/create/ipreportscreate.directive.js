(function () {
	angular
		.module('ssacpos')
		.directive('ipreportcreate', ipreportcreate);

	function ipreportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/ipreports/create/ipreportscreate.template.html',
			controller: 'ipreportsCreateCtrl as rvm'
		};
	}
}) ();