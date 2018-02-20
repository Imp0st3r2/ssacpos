(function () {
	angular
		.module('ssacpos')
		.directive('dialogbox', dialogbox);

	function dialogbox() {
		return {
			restrict: 'EA',
			scope: {
				content : "=content"
			},
			templateUrl: '/pieces/dialogbox/dialogbox.template.html',
			controller: 'dialogboxCtrl as dvm'
		};
	}
}) ();