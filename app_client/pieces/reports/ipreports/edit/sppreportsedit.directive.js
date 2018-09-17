(function () {
	angular
		.module('ssacpos')
		.directive('sppreportedit', sppreportedit);

	function sppreportedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/sppreports/edit/sppreportsedit.template.html',
			controller: 'sppreportsEditCtrl as rvm'
		};
	}
}) ();