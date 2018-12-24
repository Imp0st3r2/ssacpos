(function () {
	angular
		.module('ssacpos')
		.directive('tpreportcreate', tpreportcreate);

	function tpreportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/tpreports/create/tpreportscreate.template.html',
			controller: 'tpreportsCreateCtrl as rvm'
		};
	}
}) ();