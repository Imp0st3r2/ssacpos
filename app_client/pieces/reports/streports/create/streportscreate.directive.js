(function () {
	angular
		.module('ssacpos')
		.directive('streportcreate', streportcreate);

	function streportcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/streports/create/streportscreate.template.html',
			controller: 'streportsCreateCtrl as rvm'
		};
	}
}) ();