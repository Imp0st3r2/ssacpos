(function () {
	angular
		.module('ssacpos')
		.directive('streportsedit', streportsedit);

	function streportsedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/reports/streports/edit/streportsedit.template.html',
			controller: 'streportsEditCtrl as rvm'
		};
	}
}) ();