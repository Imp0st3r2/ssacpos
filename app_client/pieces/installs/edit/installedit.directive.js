(function () {
	angular
		.module('ssacpos')
		.directive('installedit', installedit);

	function installedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/installs/edit/installedit.template.html',
			controller: 'installeditCtrl as ivm'
		};
	}
}) ();