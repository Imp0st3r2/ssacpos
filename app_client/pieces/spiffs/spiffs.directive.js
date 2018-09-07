(function () {
	angular
		.module('ssacpos')
		.directive('spiffs', spiffs);

	function spiffs() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/spiffs/spiffs.template.html',
			controller: 'spiffsCtrl as svm'
		};
	}
}) ();