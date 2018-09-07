(function () {
	angular
		.module('ssacpos')
		.directive('spiffcreate', spiffcreate);

	function spiffcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/spiffs/create/spiffcreate.template.html',
			controller: 'spiffcreateCtrl as svm'
		};
	}
}) ();