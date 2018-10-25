(function () {
	angular
		.module('ssacpos')
		.directive('ipreportsedit', ipreportsedit);

	function ipreportsedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/ipreports/edit/ipreportsedit.template.html',
			controller: 'ipreportsEditCtrl as rvm'
		};
	}
}) ();