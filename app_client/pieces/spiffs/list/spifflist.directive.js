(function () {
	angular
		.module('ssacpos')
		.directive('spifflist', spifflist);

	function spifflist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/spiffs/list/spifflist.template.html',
			controller: 'spifflistCtrl as svm'
		};
	}
}) ();