(function () {
	angular
		.module('ssacpos')
		.directive('sppreportcreate', sppreportcreate);

	function sppreportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/sppreports/create/sppreportscreate.template.html',
			controller: 'sppreportsCreateCtrl as rvm'
		};
	}
}) ();