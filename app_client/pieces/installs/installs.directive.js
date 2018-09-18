(function () {
	angular
		.module('ssacpos')
		.directive('installs', installs);

	function installs() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/installs/installs.template.html',
			controller: 'installsCtrl as ivm'
		};
	}
}) ();