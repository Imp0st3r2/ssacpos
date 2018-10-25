(function () {
	angular
		.module('ssacpos')
		.directive('installcreate', installcreate);

	function installcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/installs/create/installcreate.template.html',
			controller: 'installcreateCtrl as ivm'
		};
	}
}) ();