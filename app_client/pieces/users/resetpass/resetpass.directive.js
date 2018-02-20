(function () {
	angular
		.module('ssacpos')
		.directive('resetpass', resetpass);

	function resetpass() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/users/resetpass/resetpass.template.html',
			controller: 'resetpassCtrl as uvm'
		};
	}
}) ();