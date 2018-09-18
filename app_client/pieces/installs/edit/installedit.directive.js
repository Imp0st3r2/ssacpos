(function () {
	angular
		.module('ssacpos')
		.directive('spiffedit', spiffedit);

	function spiffedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/spiffs/edit/spiffedit.template.html',
			controller: 'spiffeditCtrl as svm'
		};
	}
}) ();