(function () {
	angular
		.module('ssacpos')
		.directive('useredit', useredit);

	function useredit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/users/edit/useredit.template.html',
			controller: 'usereditCtrl as uvm'
		};
	}
}) ();