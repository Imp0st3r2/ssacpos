(function () {
	angular
		.module('ssacpos')
		.directive('installlist', installlist);

	function installlist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/installs/list/installlist.template.html',
			controller: 'installlistCtrl as ivm'
		};
	}
}) ();